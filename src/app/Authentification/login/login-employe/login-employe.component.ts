import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { AuthService } from 'src/app/_services/auth.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login-employe',
  templateUrl: './login-employe.component.html',
  styleUrls: ['./login-employe.component.scss']
})
export class LoginEmployeComponent implements OnInit {
  compteUtilisateur = {};
  titre = 'Zone de connexion employé';
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private userIdle: UserIdleService,
    private route: ActivatedRoute,
    private _appComponent: AppComponent
  ) { }

  ngOnInit() {
    // Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => this._authService.logout());
  }

  stop() {
    console.log('stop');
    this.userIdle.stopTimer();
  }

  stopWatching() {
    console.log('stopWatching');
    this.userIdle.stopWatching();
  }

  startWatching() {
    console.log('startWatching');
    this.userIdle.startWatching();
  }

  restart() {
    console.log('restart');
    this.userIdle.resetTimer();
  }

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
      err => console.log(err)
    );
  }
}
