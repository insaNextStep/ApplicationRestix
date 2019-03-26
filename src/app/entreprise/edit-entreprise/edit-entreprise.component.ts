import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MEntreprise } from 'src/app/_models/entreprise.model';
import { IEntreprise } from 'src/app/_models/entreprise.interface';
import { EntrepriseService } from 'src/app/_services/entreprise.service';
import { AuthService } from 'src/app/_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-entreprise',
  templateUrl: './edit-entreprise.component.html',
  styleUrls: ['./edit-entreprise.component.scss']
})
export class EditEntrepriseComponent implements OnInit {
  // tslint:disable-next-line:member-ordering
  entrepriseForm: FormGroup;
  entreprise: IEntreprise;
  oldEntreprise: IEntreprise;
  idEntreprise = '';
  submitted = false;
  originEmail = '';

  loginExist = false;

  tableDonnees: {
    email;
    iban;
    siret;
  };

  eleUnique = {
    email: true,
    iban: true,
    siret: true
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _entrepriseService: EntrepriseService,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private _jwtHelperService: JwtHelperService,
    private _location: Location
  ) {
    // console.log('\n\n **************** EditEntrepriseComponent');

    this._entrepriseService.getAll().subscribe(res => {
      // console.log(res);
      this.tableDonnees = res as any;
    });

    const token = this._authService.getToken();
    // console.log('token : ' + token);

    // si token existe alors
    if (token) {
      // décoder le token et récupérer l'id de l'employe
      const decodeToken = this._jwtHelperService.decodeToken(token);
      // console.log('decodeToken', decodeToken);
      // this.afficherTransactions(decodeToken.subject);
      this.originEmail = decodeToken.email;
      this.idEntreprise = decodeToken.subject;
      this.recupererEntreprise(this.idEntreprise);
    } else {
      this.originEmail = '';
    }
    // console.log(this._authService.currentEmployeValue);

    // this.route.paramMap.subscribe(params => {
    //   this.idEntreprise = params.get('id');
    //   if (this.idEntreprise) {
    //     this.recupererEntreprise(this.idEntreprise);
    //   }
    // });
  }

  statusBoutton = 'Soumettre';

  recupererEntreprise(id: string) {
    this._entrepriseService
      .getEntreprise(id)
      .subscribe(
        entreprise => this.editEntreprise(entreprise),
        // err => console.log('Erreur chargement : ' + err)
      );
  }

  editEntreprise(entreprise) {
    this.oldEntreprise = entreprise;
    // console.log('oldentreprise', this.oldEntreprise);
    const tel = '0' + entreprise.tel;
    this.entrepriseForm.patchValue({
      nomEntreprise: entreprise.nomEntreprise,
      tel: tel,
      email: entreprise.email,
      ibanEntreprise: entreprise.ibanEntreprise,
      siretEntreprise: entreprise.siretEntreprise
    });
  }

  ngOnInit(): void {
    this.entrepriseForm = this._formBuilder.group({
      nomEntreprise: ['', [Validators.required, Validators.minLength(4)]],
      tel: [
        '',
        [Validators.required, Validators.pattern(/^0[1-9]( *[0-9]{2}){4}$/)]
      ],
      email: ['', [Validators.required, Validators.email]],
      ibanEntreprise: [
        '',
        [
          Validators.required,
          Validators.minLength(27),
          Validators.maxLength(27)
        ]
      ],
      siretEntreprise: [
        '',
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14)
        ]
      ]
    });
  }

  uniqueElement(element) {
    // console.log('zone de control unique');
    switch (element) {
      case 'email':
      // console.log(typeof(this.oldEntreprise.email), typeof(this.f.email.value));
      // console.log(this.oldEntreprise.email, this.f.email.value);
        if (this.oldEntreprise.email !== this.f.email.value) {
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
      const siretVal = parseInt(this.f.siretEntreprise.value, 10);
      // console.log(typeof(this.oldEntreprise.siretEntreprise), typeof(siretVal));
      // console.log(this.oldEntreprise.siretEntreprise, siretVal);
        if (
          this.oldEntreprise.siretEntreprise !== siretVal
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
      // console.log(typeof(this.oldEntreprise.ibanEntreprise), typeof(this.f.ibanEntreprise.value));
      // console.log(this.oldEntreprise.ibanEntreprise, this.f.ibanEntreprise.value);
        if (
          this.oldEntreprise.ibanEntreprise !== this.f.ibanEntreprise.value
        ) {
          this.eleUnique.iban = this.testUnique(
            this.tableDonnees.iban,
            this.f.ibanEntreprise.value
          );
        } else {
          this.eleUnique.iban = true;
        }
        // console.log('iban unique ? ' + this.eleUnique.iban);
        break;

      default:
        break;
    }
  }

  get f() {
    return this.entrepriseForm.controls;
  }

  testUnique(tableau, valeur) {
    const resltat = tableau.find(el => {
      return el === valeur;
    });
    return resltat === valeur ? false : true;
  }

  onSubmitForm() {
    this.submitted = true;

    if (this.entrepriseForm.invalid) {
      return;
    } else {
      // this.submitted = true;
      console.log('OK pour le formulaire');
      this.faireSubmit();
    }
  }

  faireSubmit() {
    const formValue = this.entrepriseForm.value;
    const newEntreprise = new MEntreprise(
      formValue['nomEntreprise'],
      formValue['tel'],
      formValue['email'],
      formValue['ibanEntreprise'],
      formValue['siretEntreprise']
    );

    console.log('event : update');
    this._entrepriseService
      .updateEntreprise(newEntreprise, this.idEntreprise)
      .pipe(first())
      .subscribe(
        resultat => {
          console.log('resultat', resultat);
          this._authService.regUser(resultat);
          this._router.navigate(['/mesEmployes']);
        },
        err => console.log('Erreur : ' + err)
      );
  }

  annuler() {
    this._location.back();
  }
}
