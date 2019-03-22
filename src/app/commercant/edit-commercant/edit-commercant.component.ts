import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommercantService } from 'src/app/_services/commercant.service';
import { MCommercant } from 'src/app/_models/commercant.model';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-edit-commercant',
  templateUrl: './edit-commercant.component.html',
  styleUrls: ['./edit-commercant.component.scss'],
  providers: [CommercantService]
})
export class EditCommercantComponent implements OnInit {
  commercantForm: FormGroup;
  commercant: MCommercant;
  statusForm = 'Editer profil';
  idCommercant = '';
  loginExist = false;
  submitted = false;
  originEmail = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _commercantService: CommercantService,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private _jwtHelperService: JwtHelperService,
  ) {
    console.log('\n\n **************** EditCommercantComponent');

    const token = this._authService.getToken();
    console.log('token : ' + token);

    // si token existe alors
    if (token) {
      // décoder le token et récupérer l'id de l'employe
      const decodeToken = this._jwtHelperService.decodeToken(token);
      console.log('decodeToken', decodeToken);
      // this.afficherTransactions(decodeToken.subject);
      this.originEmail = decodeToken.email;
    } else {
      this.originEmail = '';
    }

    this.route.paramMap.subscribe(params => {
      this.idCommercant = params.get('id');
      if (this.idCommercant) {
        this.recupererCommercant(this.idCommercant);
      }
    });
  }
  // statusBoutton = 'Soumettre';
  recupererCommercant(id: string) {
    this._commercantService
      .getCommercant(id)
      .subscribe(
        commercant => this.editCommercant(commercant),
        err => console.log('Erreur chargement : ' + err)
      );
  }

  editCommercant(commercant) {
    const tel = '0' + commercant.tel;
    this.commercantForm.patchValue({
      nomCommercant: commercant.nomCommercant,
      tel: tel,
      email: commercant.email,
      ibanCommercant: commercant.ibanCommercant,
      siretCommercant: commercant.siretCommercant,
      tpe: commercant.tpe
    });
  }

  ngOnInit() {
    this.commercantForm = this._formBuilder.group({
      nomCommercant: ['', [Validators.required, Validators.minLength(4)]],
      tel: [
        '',
        [Validators.required, Validators.pattern(/^0[1-9]( *[0-9]{2}){4}$/)]
      ],
      email: ['', [Validators.required, Validators.email]],
      ibanCommercant: [
        '',
        [
          Validators.required,
          Validators.minLength(27),
          Validators.maxLength(27)
        ]
      ],
      siretCommercant: [
        '',
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14),
          Validators.pattern(/^[1-9][0-9]{13}$/)
        ]
      ],
      tpe: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12),
          Validators.pattern(/^1[0-9]{11}$/)
        ]
      ]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.commercantForm.controls;
  }

  onSubmitForm() {
    this.submitted = true;

    if (this.commercantForm.invalid) {
      // if (this.commercantForm.invalid) {
      if (this.commercantForm['nomCommercant'].errors) {
        // console.log(this.commercantForm['siretCommercant'].errors);
      }

      if (this.commercantForm['tel'].errors) {
        // console.log(this.commercantForm['siretCommercant'].errors);
      }

      if (this.commercantForm['email'].errors) {
        // console.log(this.commercantForm['siretCommercant'].errors);
      }

      if (this.commercantForm['ibanCommercant'].errors) {
        // console.log(this.commercantForm['siretCommercant'].errors);
      }
      if (this.commercantForm['tpe'].errors) {
        // console.log(this.commercantForm['siretCommercant'].errors);
      }
      this.submitted = false;
      return;
    } else {
      const email = this.f.email.value;
      if (this.f.email.value && this.f.email.value !== this.originEmail) {
        this._commercantService.emailExist(email).subscribe((res: any) => {
          console.log(res);
          if (res.message === 'err') {
            this.loginExist = true;
            return;
          } else {
            // this.loginExist = false;
            this.faireSubmit();
          }
        });
      } else {
        this.faireSubmit();
      }
    }
  }

  faireSubmit() {
    const formValue = this.commercantForm.value;
    const newCommercant = new MCommercant(
      formValue['nomCommercant'],
      formValue['tel'],
      formValue['email'],
      formValue['ibanCommercant'],
      formValue['siretCommercant'],
      formValue['tpe']
    );

      console.log('event : update');
      this._commercantService
        .updateCommercant(newCommercant, this.idCommercant)
        .pipe(first())
        .subscribe(
          (resultat) => {
            this._authService.regUser(resultat);
            this._router.navigate(['/mesVentes']);
          },
          err => console.log('Erreur : ' + err)
        );
    // this._router.navigate(['/listCommercants']);
  }
}
