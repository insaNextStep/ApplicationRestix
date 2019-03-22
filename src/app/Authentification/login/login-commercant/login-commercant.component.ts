import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { AuthService } from 'src/app/_services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { CommercantService } from 'src/app/_services/commercant.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MLogin } from 'src/app/_models/login.model';

@Component({
  selector: 'app-login-commercant',
  templateUrl: './login-commercant.component.html',
  styleUrls: ['./login-commercant.component.scss']
})
export class LogincommercantComponent implements OnInit {
  commercantForm: FormGroup;
  compteUtilisateur: any = {};
  titre = 'Zone de connexion commercant';
  loginExist = false;
  errPassword = false;
  submitted = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _appComponent: AppComponent,
    private _commercantService: CommercantService,
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit() {

    this.commercantForm = this._formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  get f() {
    return this.commercantForm.controls;
  }

  onSubmitForm() {
    this.submitted = true;

    if (this.commercantForm.invalid) {
      // this.submitted = false;
      return;
    } else {
      // this.submitted = true;
      console.log('OK pour le formulaire');
      this.donneesFormulaire();
    }
  }


  donneesFormulaire() {
    console.log('login commercant :');
    const formValue = this.commercantForm.value;
    const newLogin = new MLogin(
      formValue['email'],
      formValue['password']
    );


    // console.log(this.compteUtilisateur);
    this._authService.loginCommercant(newLogin).subscribe(
      res => {
        console.log(res);
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
