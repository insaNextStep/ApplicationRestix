import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeService } from '../../_services/employe.service';
import { AuthService } from '../../_services/auth.service';
import { IEmploye } from '../../_models/employe.interface';
import { MEmploye } from 'src/app/_models/employe.model';
import { first } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Location } from '@angular/common';
import { EntrepriseService } from 'src/app/_services/entreprise.service';

@Component({
  selector: 'app-edit-employe',
  templateUrl: './edit-employe.component.html',
  styleUrls: ['./edit-employe.component.scss']
})
export class EditEmployeComponent implements OnInit {
  // tslint:disable-next-line:member-ordering
  employeForm: FormGroup;
  employe: MEmploye;
  oldEmploye: MEmploye;
  status = 'Nouvel Employe';
  idEmploye = '';
  private actuelEntreprise: any;
  submitted = false;
  originEmail = '';
  loginExist = false;

  tableDonnees: {
    email;
  };

  eleUnique = {
    email: true,
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _employeService: EmployeService,
    private route: ActivatedRoute,
    private _jwtHelperService: JwtHelperService,
    // private _entrepriseService: EntrepriseService,
    private _authService: AuthService,
    private _location: Location
  ) {
    // console.log('\n\n **************** EditEntrepriseComponent');

    this._employeService.getAll().subscribe(res => {
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
      this.idEmploye = decodeToken.subject;
      this.recupererEmploye(this.idEmploye);
    } else {
      this.originEmail = '';
    }
    // console.log(this._authService.currentEmployeValue);

    this.route.paramMap.subscribe(params => {
      this.idEmploye = params.get('id');
      if (this.idEmploye) {
        console.log(this.idEmploye);
        this.recupererEmploye(this.idEmploye);
      }
    });
  }

  statusBoutton = 'Soumettre';

  recupererEmploye(id: string) {
    console.log('\n\n edit recupererEmploye', id);
    this._employeService
      .getEmploye(id)
      .subscribe(
        employe => {
          console.log(employe);
          this.editEmploye(employe);
        },
        err => console.log('Erreur chargement : ' + err)
      );
  }

  editEmploye(employe) {
    console.log('\n\n edit employé', employe);
    this.oldEmploye = employe;
    console.log(employe);
    const tel = '0' + employe.tel;
    this.employeForm.patchValue({
      nom: employe.nom,
      prenom: employe.prenom,
      tel: tel,
      email: employe.email
    });
  }

  ngOnInit() {
    this.employeForm = this._formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(4)]],
      prenom: ['', [Validators.required, Validators.minLength(4)]],
      tel: [
        '',
        [Validators.required, Validators.pattern(/^0[1-9]( *[0-9]{2}){4}$/)]
      ],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  uniqueElement(element) {
    console.log('zone de control unique');
    switch (element) {
      case 'email':
      console.log(typeof(this.oldEmploye.email), typeof(this.f.email.value));
      console.log(this.oldEmploye.email, this.f.email.value);
        if (this.oldEmploye.email !== this.f.email.value) {
          this.eleUnique.email = this.testUnique(
            this.tableDonnees.email,
            this.f.email.value
          );
        } else {
          this.eleUnique.email = true;
        }
        console.log('email unique ? ' + this.eleUnique.email);
        break;

      default:
        break;
    }
  }

  get f() {
    return this.employeForm.controls;
  }

  testUnique(tableau, valeur) {
    const resltat = tableau.find(el => {
      return el === valeur;
    });
    return resltat === valeur ? false : true;
  }

  onSubmitForm() {
    this.submitted = true;

    if (this.employeForm.invalid) {
      return;
    } else {
      console.log('OK pour le formulaire');
      this.faireSubmit();
    }
    this._router.navigate(['/listEntreprise']);
  }

  faireSubmit() {
    const formValue = this.employeForm.value;
    formValue.entreprise = this.actuelEntreprise;
    const newEmploye = new MEmploye(
      formValue['nom'],
      formValue['prenom'],
      formValue['tel'],
      formValue['email']
    );

    console.log('event : update');
    this._employeService
      .updateEmploye(newEmploye, this.idEmploye)
      .pipe(first())
      .subscribe(
        (resultat) => {
          if (this._authService.getRole() !== 'EMPLOYE') {
            this._router.navigate(['/mesEmployes']);
          } else {
            this._authService.regUser(resultat);
            this._router.navigate(['/ActiveCompte']);
          }
        },
        err => console.log('Erreur : ' + err)
      );
  }

  annuler() {
    this._location.back();
  }
}
