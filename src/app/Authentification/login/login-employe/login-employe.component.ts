import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { EmployeService } from 'src/app/_services/employe.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MLogin } from 'src/app/_models/login.model';

@Component({
  selector: 'app-login-employe',
  templateUrl: './login-employe.component.html',
  styleUrls: ['./login-employe.component.scss']
})
export class LoginEmployeComponent implements OnInit {
  employeForm: FormGroup;
  compteUtilisateur: any = {};
  titre = 'Zone de connexion employé';
  loginExist = false;
  errPassword = false;
  submitted = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _employeService: EmployeService,
    private _appComponent: AppComponent,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.employeForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.employeForm.controls;
  }

  onSubmitForm() {
    this.submitted = true;

    if (this.employeForm.invalid) {
      // this.submitted = false;
      return;
    } else {
      // this.submitted = true;
      console.log('OK pour le formulaire');
      this.donneesFormulaire();
    }
  }

  donneesFormulaire() {
    console.log('login employe :');
    const formValue = this.employeForm.value;
    const newLogin = new MLogin(
      formValue['email'],
      formValue['password']
      );

    // console.log(this.compteUtilisateur);
    this._authService.loginEmploye(newLogin).subscribe(
      res => {
        console.log(res);
        this._appComponent.isAuth = true;
        this.errPassword = false;
        this._router.navigate(['/mesTransactions']);
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
    }
  }
}
