import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  compteUtilisateur = {};
  titre = 'Zone de connexion employé';
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private userIdle: UserIdleService,
    private route: ActivatedRoute
  ) {
    this.role = this.route.params['value'].id;


    if (this.role === 'Entreprise') {
      this.titre = 'Zone de connexion employé';
      // this.statusBoutton = 'Mise à jour';
    }

    // this.route.paramMap.subscribe(params => {
    //   this.idCommercant = params.get('id');
    //   if (this.idCommercant) {
    //     this.recupererCommercant(this.idCommercant);
    //   }
    // });
  }
  role = '';

  ngOnInit() {
    console.log('role : ' + this.role);
    console.log('titre : ' + this.titre);
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
        // const token = localStorage.setItem('token', res.token);
        // const role = localStorage.setItem('role', res.role);
        //       console.log('token : ' + token + '\nrole : ' + role);
        this._router.navigate(['employes']);
      },
      err => console.log(err)
    );
  }
}
