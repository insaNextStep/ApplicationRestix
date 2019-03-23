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
})
export class EditCommercantComponent implements OnInit {
  commercantForm: FormGroup;
  commercant: MCommercant;
  oldCommercant: MCommercant;
  statusForm = 'Editer profil';
  idCommercant = '';
  loginExist = false;
  submitted = false;
  originEmail = '';

  // originEmail = '';
  tableDonnees: {
    email: true,
    iban: true,
    tpe: true,
    siret: true
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
    private route: ActivatedRoute,
    private _authService: AuthService,
    private _jwtHelperService: JwtHelperService,
  ) {
    console.log('\n\n **************** EditCommercantComponent');

    this._commercantService.getAll().subscribe(res => {
      console.log(res);
      this.tableDonnees = res as any;
    });

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

  statusBoutton = 'Soumettre';
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
    this.oldCommercant = commercant;
    console.log('this.oldCommercant', this.oldCommercant);
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
          Validators.maxLength(14)
        ]
      ],
      tpe: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12),
        ]
      ]
    });
  }

  uniqueElement(element) {
    console.log('zone de control unique');
    switch (element) {
      case 'email':
        console.log(typeof(this.oldCommercant.email), typeof(this.f.email.value));
        if (this.oldCommercant.email !== this.f.email.value) {
          this.eleUnique.email = this.testUnique(
            this.tableDonnees.email,
            this.f.email.value
          );
        } else {
          this.eleUnique.email = true;
        }
        // console.log('email unique ? ' + this.eleUnique.email);
        break;

      case 'siret':
      const siretVal = parseInt(this.f.siretCommercant.value, 10);
      console.log(typeof(this.oldCommercant.siretCommercant), typeof(siretVal));
        if (
          this.oldCommercant.siretCommercant !== this.f.siretCommercant.value
        ) {
          this.eleUnique.siret = this.testUnique(
            this.tableDonnees.siret,
            siretVal
          );
        } else {
          this.eleUnique.siret = true;
        }
        // console.log('siret unique ? ' + this.eleUnique.siret);
        break;

      case 'iban':
      console.log(typeof(this.oldCommercant.ibanCommercant), typeof(this.f.ibanCommercant.value));
        if (
          this.oldCommercant.ibanCommercant !== this.f.ibanCommercant.value
        ) {
          this.eleUnique.iban = this.testUnique(
            this.tableDonnees.iban,
            this.f.ibanCommercant.value
          );
        } else {
          this.eleUnique.iban = true;
        }
        // console.log('iban unique ? ' + this.eleUnique.iban);
        break;

        case 'tpe':
        const tpeVal = parseInt(this.f.tpe.value, 10);
        console.log(typeof(this.oldCommercant.tpe), typeof(tpeVal));
        if (
          this.oldCommercant.tpe !== tpeVal
        ) {
          this.eleUnique.tpe = this.testUnique(
            this.tableDonnees.tpe,
            tpeVal
          );
        } else {
          this.eleUnique.tpe = true;
        }
        // console.log('iban unique ? ' + this.eleUnique.iban);
        break;

      default:
        break;
    }
  }

  get f() {
    return this.commercantForm.controls;
  }

  testUnique(tableau, valeur) {
    const resltat = tableau.find(el => {
      return el === valeur;
    });
    return resltat === valeur ? false : true;
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
          resultat => {
            this._authService.regUser(resultat);
            this._router.navigate(['/mesVentes']);
          },
          err => console.log('Erreur : ' + err)
        );
  }
}
