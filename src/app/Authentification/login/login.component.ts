import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  compteUtilisateur = {};
  constructor(private _authService: AuthService, private _route: Router) { }

  ngOnInit() { }

  donneesFormulaire() {
    console.log('this.compteUtilisateur :');
    console.log(this.compteUtilisateur);
    this._authService
      .loginEmployee(this.compteUtilisateur)
      .subscribe(
        res => {
          console.log(res);
    //       // enregistrement local du token
          const token = localStorage.setItem('token', res.token);
          const role = localStorage.setItem('role', res.role);
    //       console.log('token : ' + token + '\nrole : ' + role);
          this._route.navigate(['employees']);
        },
        err => console.log(err));
  }
}
