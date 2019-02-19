import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  compteUtilisateur = {};
  constructor(private _auth: AuthService, private _route: Router) { }

  ngOnInit() { }

  donneesFormulaire() {
    this._auth
      .LoginEmployee(this.compteUtilisateur)
      .subscribe(
        res => {
          console.log(res);
          // enregistrement local du token
          localStorage.setItem('token', res.token);
          this._route.navigate(['/employeView']);
        },
        err => console.log(err));
  }

}
