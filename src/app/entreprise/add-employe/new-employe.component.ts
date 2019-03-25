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
  selector: 'app-new-employe',
  templateUrl: './new-employe.component.html',
  styleUrls: ['./new-employe.component.scss']
})
export class NewEmployeComponent implements OnInit {
  // tslint:disable-next-line:member-ordering
  employeForm: FormGroup;
  employe: MEmploye;
  status = 'Nouvel Employe';
  idEmploye = '';
  private actuelEntreprise: any;
  submitted = false;
  loginExist = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _employeService: EmployeService,
    private route: ActivatedRoute,
    private _jwtHelperService: JwtHelperService,
    private _entrepriseService: EntrepriseService,
    private _authService: AuthService,
    private _location: Location
  ) {
    // console.log(this.status);
    if (this.route.params['value'].id) {
      this.status = 'Editer profil';
      // this.statusBoutton = 'Mise à jour';
    }

    this.route.paramMap.subscribe(params => {
      this.idEmploye = params.get('id');
      if (this.idEmploye) {
        this.recupererEmploye(this.idEmploye);
      }
    });
  }

  statusBoutton = 'Soumettre';

  recupererEmploye(id: string) {
    this._employeService
      .getEmploye(id)
      .subscribe(
        employe => this.editEmploye(employe),
        // err => console.log('Erreur chargement : ' + err)
      );
  }

  editEmploye(employe) {
    const tel = '0' + employe.tel;
    this.employeForm.patchValue({
      nom: employe.nom,
      prenom: employe.prenom,
      tel: tel,
      email: employe.email
    });
  }

  initForm() {
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

  get f() {
    return this.employeForm.controls;
  }

  onSubmitForm() {
    this.submitted = true;

    if (this.employeForm.invalid) {
      // this.submitted = false;
      return;
    } else {
      // console.log('OK pour le formulaire');
      this.faireSubmit();
    }
    // this._router.navigate(['/listEntreprise']);
  }

  ngOnInit() {
    // console.log(this._authService.currentEmployeValue);
    const token = this._authService.getToken();
    // console.log('token : ' + token);
    if (token) {
      const decodeToken = this._jwtHelperService.decodeToken(token);
      // console.log('entrepriseId : ' + decodeToken.subject);
      this._entrepriseService.getEntrepriseName(decodeToken.subject).subscribe(
        res => {
          this.actuelEntreprise = res;
          // console.log(this.actuelEntreprise);
        },
        err => {
          // console.log('erreur :' + err);
        }
      );
    } else {
      this.actuelEntreprise = '';
    }
    // console.log(this._authService.currentEmployeValue);
    this.initForm();
  }

  annuler() {
    this._location.back();
  }

  faireSubmit() {
    const formValue = this.employeForm.value;
    formValue.entreprise = this.actuelEntreprise;
    const newEmploye = new MEmploye(
      formValue['nom'],
      formValue['prenom'],
      formValue['tel'],
      formValue['email'],
      formValue['entreprise']
    );

    // console.log('event : add');
    this._employeService.addNewEmploye(newEmploye);
    this._router.navigate(['/mesEmployes']);
  }
}
