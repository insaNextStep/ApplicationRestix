import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { UserIdleService } from 'angular-user-idle';
import { AuthService } from 'src/app/_services/auth.service';
import { AppComponent } from 'src/app/app.component';
// import { IEntreprise } from 'src/app/_models/entreprise.interface';
import { EntrepriseService } from 'src/app/_services/entreprise.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MLogin } from 'src/app/_models/login.model';

@Component({
  selector: 'app-login-entreprise',
  templateUrl: './login-entreprise.component.html',
  styleUrls: ['./login-entreprise.component.scss']
})
export class LoginEntrepriseComponent implements OnInit {
  entrepriseForm: FormGroup;
  compteUtilisateur: any = {};
  titre = 'Zone de connexion entreprise';
  loginExist = false;
  errPassword = false;
  submitted = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    // private userIdle: UserIdleService,
    // private route: ActivatedRoute,
    private _appComponent: AppComponent,
    private _entrepriseService: EntrepriseService,
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.entrepriseForm = this._formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  get f() {
    return this.entrepriseForm.controls;
  }

  onSubmitForm() {
    this.submitted = true;

    if (this.entrepriseForm.invalid) {
      // this.submitted = false;
      return;
    } else {
      // this.submitted = true;
      console.log('OK pour le formulaire');
      this.donneesFormulaire();
    }
  }


  donneesFormulaire() {
    console.log('login entreprise :');
    const formValue = this.entrepriseForm.value;
    const newLogin = new MLogin(
      formValue['email'],
      formValue['password']
    );


    // console.log(this.compteUtilisateur);
    this._authService.loginEntreprise(newLogin).subscribe(
      res => {
        console.log(res);
        this._appComponent.isAuth = true;
        this.errPassword = false;
        this._router.navigate(['/mesEmployes']);
      },
      err => this.errPassword = true
    );
  }

  focusOutFunction(event: string) {
    if (event['path'][0].value) {
      const email = event['path'][0].value;
      this._entrepriseService.emailExist(email).subscribe((res: any) => {
        console.log(res);
        if (res.message === 'err') {
          this.loginExist = false;
        } else {
           this.loginExist = true;
        }
      });
  }}
}

  // donneesFormulaire() {
  //   console.log('login Entreprise :');
  //   console.log(this.compteUtilisateur);
  //   this._authService.loginEntreprise(this.compteUtilisateur).subscribe(
  //     res => {
  //       console.log(res);
  //       //       // enregistrement local du token
  //       // const token = localStorage.setItem('token', res.token);
  //       // const role = localStorage.setItem('role', res.role);
  //       //       console.log('token : ' + token + '\nrole : ' + role);
  //       this._appComponent.isAuth = true;
  //       this._router.navigate(['/mesEmployes']);
  //     },
  //     err => this.errPassword = true
  //   );
  // }

  // focusOutFunction(event: string) {
  //   if (event['path'][0].value) {
  //     const email = event['path'][0].value;
  //     this._entrepriseService.emailExist(email).subscribe((res: any) => {
  //       console.log(res);
  //       if (res.message === 'err') {
  //         this.loginExist = false;
  //       } else {
  //          this.loginExist = true;
  //       }
  //     });
  // }}
// }
