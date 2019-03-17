import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { AuthService } from 'src/app/_services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { IEmploye } from 'src/app/_models/employe.interface';
import { AlertService } from 'src/app/_services/alert.service';
import { EmployeService } from 'src/app/_services/employe.service';

@Component({
  selector: 'app-login-employe',
  templateUrl: './login-employe.component.html',
  styleUrls: ['./login-employe.component.scss']
})
export class LoginEmployeComponent implements OnInit {

  compteUtilisateur: any = {};
  titre = 'Zone de connexion employé';
  loginExist = false;
  errPassword = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _alertService: AlertService,
    private _userIdle: UserIdleService,
    private _route: ActivatedRoute,
    private _employeService: EmployeService,
    private _appComponent: AppComponent
  ) { }

  ngOnInit() {
    // Start watching for user inactivity.
    // this.userIdle.startWatching();

    // // Start watching when user idle is starting.
    // this.userIdle.onTimerStart().subscribe(count => console.log(count));

    // // Start watch when time is up.
    // this.userIdle.onTimeout().subscribe(() => this._authService.logout());
  }

  // stop() {
  //   console.log('stop');
  //   this.userIdle.stopTimer();
  // }

  // stopWatching() {
  //   console.log('stopWatching');
  //   this.userIdle.stopWatching();
  // }

  // startWatching() {
  //   console.log('startWatching');
  //   this.userIdle.startWatching();
  // }

  // restart() {
  //   console.log('restart');
  //   this.userIdle.resetTimer();
  // }

  donneesFormulaire() {
    console.log('this.compteUtilisateur :');
    console.log(this.compteUtilisateur);
    this._authService.loginEmploye(this.compteUtilisateur).subscribe(
      res => {
        console.log(res);
        //       // enregistrement local du token
        // const token = localStorage.setItem('currentUser', res.token);
        // const role = localStorage.setItem('currentUser', res.role);
        //       console.log('token : ' + token + '\nrole : ' + role);
        this._appComponent.isAuth = true;
        this._router.navigate(['/ActiveCompte']);
      },
        err => this.errPassword = true
    );
  }

  focusOutFunction(event: string) {
    if (event['path'][0].value) {
      const email = event['path'][0].value;
      this._employeService.emailExist(email).subscribe((res: any) => {
        console.log(res);
        if (res.message === 'err') {
          this.loginExist = false;
        } else {
           this.loginExist = true;
        }
      });
  }}
}
