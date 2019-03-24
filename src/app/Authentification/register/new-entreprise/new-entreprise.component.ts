import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MEntreprise } from 'src/app/_models/entreprise.model';
import { IEntreprise } from 'src/app/_models/entreprise.interface';
import { EntrepriseService } from 'src/app/_services/entreprise.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { AuthService } from 'src/app/_services/auth.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-new-entreprise',
  templateUrl: './new-entreprise.component.html',
  styleUrls: ['./new-entreprise.component.scss']
})
export class NewEntrepriseComponent implements OnInit {
  // tslint:disable-next-line:member-ordering
  entrepriseForm: FormGroup;
  // entreprise: IEntreprise;
  // status = 'Formulaire d\'inscription';
  // idEntreprise = '';
  submitted = false;

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
    // private route: ActivatedRoute,
    private _authService: AuthService,
    private _appComponent: AppComponent
  ) {
    this._entrepriseService.getAll().subscribe(res => {
      console.log(res);
      this.tableDonnees = res as any;
    });
  }

  ngOnInit(): void {
    this.entrepriseForm = this._formBuilder.group(
      {
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

      case 'siret':
        this.eleUnique.siret = this.testUnique(
          this.tableDonnees.siret,
          this.f.siretEntreprise.value
        );
        // console.log('siret unique ? ' + this.eleUnique.siret);
        break;

      case 'iban':
        this.eleUnique.iban = this.testUnique(
          this.tableDonnees.iban,
          this.f.ibanEntreprise.value
        );
        // console.log('iban unique ? ' + this.eleUnique.iban);
        break;

      default:
        break;
    }
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
      formValue['siretEntreprise'],
      formValue['password']
    );

    this._authService.registerEntreprise(newEntreprise).subscribe(() => {
      const login = {
        password: newEntreprise.password,
        email: newEntreprise.email
      };
      this._authService.loginEntreprise(login).subscribe(
        res => {
          console.log(res);
          this._appComponent.isAuth = true;
          this._router.navigate(['/mesEmployes']);
        }
      );
    });
  }
}
