import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  compteUtilisateur = {};
  constructor(private _auth: AuthService) {}

  ngOnInit() {}

  donneesFormulaire() {
    this._auth
      .LoginEmployee(this.compteUtilisateur)
      .subscribe(res => console.log(res), err => console.log(err));
  }

}
