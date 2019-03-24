import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommercantService } from 'src/app/_services/commercant.service';
import { MCommercant } from 'src/app/_models/commercant.model';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { resolveTimingValue } from '@angular/animations/browser/src/util';
import { reject } from 'q';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-new-commercant',
  templateUrl: './new-commercant.component.html',
  styleUrls: ['./new-commercant.component.scss'],
  providers: [CommercantService]
})
export class NewCommercantComponent implements OnInit {
  commercantForm: FormGroup;
  // commercant: MCommercant;
  // statusForm = 'Formulaire d\'inscription';
  // idCommercant = '';
  // loginExist = false;
  submitted = false;
  // originEmail = '';
  tableDonnees: {
    email: true;
    iban: true;
    tpe: true;
    siret: true;
  };

  eleUnique = {
    email: true,
    iban: true,
    tpe: true,
    siret: true
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _commercantService: CommercantService,
    // private route: ActivatedRoute,
    private _authService: AuthService,
    private _appComponent: AppComponent
  ) {
    this._commercantService.getAll().subscribe(res => {
      console.log(res);
      this.tableDonnees = res as any;
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
            Validators.maxLength(14)
          ]
        ],
        tpe: [
          '',
          [
            Validators.required,
            Validators.minLength(12),
            Validators.maxLength(12)
          ]
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );
  }

  testUnique(tableau, valeur) {
    const resltat = tableau.find(el => {
      return el === valeur;
    });
    return resltat === valeur ? false : true;
  }

  uniqueElement(element) {
    console.log('zone de control unique');
    switch (element) {
      case 'email':
        this.eleUnique.email = this.testUnique(
          this.tableDonnees.email,
          this.f.email.value
        );
        // console.log('email unique ? ' + this.eleUnique.email);
        break;

      case 'tpe':
        const tpeVal = parseInt(this.f.tpe.value, 10);
        this.eleUnique.tpe = this.testUnique(
          this.tableDonnees.tpe,
          tpeVal
        );
        // console.log('tpe unique ? ' + this.eleUnique.tpe);
        break;

      case 'siret':
      const siretVal = parseInt(this.f.siretCommercant.value, 10);
        this.eleUnique.siret = this.testUnique(
          this.tableDonnees.siret,
          siretVal
        );
        // console.log('siret unique ? ' + this.eleUnique.siret);
        break;

      case 'iban':
        this.eleUnique.iban = this.testUnique(
          this.tableDonnees.iban,
          this.f.ibanCommercant.value
        );
        // console.log('iban unique ? ' + this.eleUnique.iban);
        break;

      default:
        break;
    }
  }

  // convenience getter for easy access to form fields
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
      this.faireSubmit();
    }
  }

  // enregistrement(newCommercant) {
  //   console.log('enregistrement new Commercant');

  //   return Promise.resolve(retour).then(
  //     () => {
  //       return retour;
  //     }
  //   ).then(val => console.log(val));
  //   // {
  //   //   resolve(this._authService.registerCommercant(newCommercant)),
  //   //   reject(console.log('erreur'));
  //   // });
  // }

  faireSubmit() {
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

    this._authService.registerCommercant(newCommercant).subscribe(() => {
      const login = {
        password: newCommercant.password,
        email: newCommercant.email
      };
      this._authService.loginCommercant(login).subscribe(
        res => {
          console.log(res);
          this._appComponent.isAuth = true;
          this._router.navigate(['/mesVentes']);
        }
      );
    });
  }
}
