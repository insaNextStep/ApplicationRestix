import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  compteUtilisateur = {};
  constructor(
    private _authService: AuthService,
    private _route: Router,
    private userIdle: UserIdleService
  ) {}

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
    this._authService.loginEmployee(this.compteUtilisateur).subscribe(
      res => {
        console.log(res);
        //       // enregistrement local du token
        const token = localStorage.setItem('token', res.token);
        const role = localStorage.setItem('role', res.role);
        //       console.log('token : ' + token + '\nrole : ' + role);
        this._route.navigate(['employees']);
      },
      err => console.log(err)
    );
  }
}
