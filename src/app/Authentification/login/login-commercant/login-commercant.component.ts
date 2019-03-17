import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { AuthService } from 'src/app/_services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { CommercantService } from 'src/app/_services/commercant.service';

@Component({
  selector: 'app-login-commercant',
  templateUrl: './login-commercant.component.html',
  styleUrls: ['./login-commercant.component.scss']
})
export class LogincommercantComponent implements OnInit {
  compteUtilisateur: any = {};
  titre = 'Zone de connexion commercant';
  loginExist = false;
  errPassword = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _appComponent: AppComponent,
    private _commercantService: CommercantService
  ) {}

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
    console.log('login commercant :');
    console.log(this.compteUtilisateur);
    this._authService.loginCommercant(this.compteUtilisateur).subscribe(
      res => {
        console.log(res);
        //       // enregistrement local du token
        // const token = localStorage.setItem('token', res.token);
        // const role = localStorage.setItem('role', res.role);
        //       console.log('token : ' + token + '\nrole : ' + role);
        this._appComponent.isAuth = true;
        this.errPassword = false;
        this._router.navigate(['/mesVentes']);
      },
      err => this.errPassword = true
    );
  }

  focusOutFunction(event: string) {
    if (event['path'][0].value) {
      const email = event['path'][0].value;
      this._commercantService.emailExist(email).subscribe((res: any) => {
        console.log(res);
        if (res.message === 'err') {
          this.loginExist = false;
        } else {
           this.loginExist = true;
        }
      });
  }}
}
