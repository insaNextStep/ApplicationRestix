import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommercantService } from 'src/app/_services/commercant.service';
import { MCommercant } from 'src/app/_models/commercant.model';
import { first } from 'rxjs/operators';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from 'src/app/_helpers/must-match.validator';
// import { UniqueEmail } from 'src/app/_helpers/must-unique-email.validator';

@Component({
  selector: 'app-new-commercant',
  templateUrl: './new-commercant.component.html',
  styleUrls: ['./new-commercant.component.scss'],
  providers: [CommercantService]
})
export class NewCommercantComponent implements OnInit {
  commercantForm: FormGroup;
  commercant: MCommercant;
  status = 'Formulaire d\'inscription';
  idCommercant = '';
  loginExist = false;
  submitted = false;
  hinibPW = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _commercantService: CommercantService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      this.idCommercant = params.get('id');
      if (this.idCommercant) {
        this.recupererCommercant(this.idCommercant);
      }
    });
  }

  UniqueEmailValidator(controlName: string) {
    console.log('controle mail');
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName].value;
      if (control) {
        this._commercantService.emailExist(control).subscribe((res: any) => {
          console.log(res);
          if (res.message === 'err') {
            control.setErrors(null);
          } else {
            control.setErrors({ uniqueEmail: true });
          }
        });
      }
    };
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

  faireSubmit(event) {
    const formValue = this.commercantForm.value;
    const newCommercant = new MCommercant(
      formValue['nomCommercant'],
      formValue['tel'],
      formValue['email'],
      formValue['ibanCommercant'],
      formValue['siretCommercant'],
      formValue['tpe'],
      formValue['password']
    );

    if (event === 'Formulaire d\'inscription') {
      console.log('event : add');
      this._commercantService.addCommercant(newCommercant);
      this._router.navigate(['/mesVentes']);
    } else {
      console.log('event : update');
      this._commercantService
        .updateCommercant(newCommercant, this.idCommercant)
        .pipe(first())
        .subscribe(
          () => {
            this._router.navigate(['/mesVentes']);
          },
          err => console.log('Erreur : ' + err)
        );
    }
    // this._router.navigate(['/listCommercants']);
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
    this.commercantForm = this._formBuilder.group(
      {
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
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.commercantForm.controls;
  }

  onSubmitForm(event) {
    this.submitted = true;
    console.log(this.commercantForm);

    const email = this.f.email.value;
    if (email && !this.hinibPW) {
      this._commercantService.emailExist(email).subscribe((res: any) => {
        console.log(res);
        if (res.message === 'err') {
          this.loginExist = true;
          return;
        } else {
          this.loginExist = false;
        }
      });
    }

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
      this.faireSubmit(event);
    }
  }
}
