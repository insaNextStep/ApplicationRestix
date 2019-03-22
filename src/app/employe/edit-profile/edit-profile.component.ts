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
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  // tslint:disable-next-line:member-ordering
  employeForm: FormGroup;
  employe: MEmploye;
  status = 'Nouvel Employe';
  idEmploye = '';
  private actuelEntreprise: any;
  submitted = false;
  originEmail = '';
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
    console.log('\n\n **************** EditEntrepriseComponent');

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
    // console.log(this._authService.currentEmployeValue);

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
        err => console.log('Erreur chargement : ' + err)
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

    // console.log(this._authService.currentEmployeValue);
    // const token = this._authService.getToken();
    // console.log('token : ' + token);
    // if (token) {
    //   const decodeToken = this._jwtHelperService.decodeToken(token);
    //   console.log('entrepriseId : ' + decodeToken.subject);
    //   this._entrepriseService.getEntrepriseName(decodeToken.subject).subscribe(
    //     res => {
    //       this.actuelEntreprise = res;
    //       console.log(this.actuelEntreprise);
    //     },
    //     err => {
    //       console.log('erreur :' + err);
    //     }
    //   );
    // } else {
    //   this.actuelEntreprise = '';
    // }
    // // console.log(this._authService.currentEmployeValue);
    // this.initForm();
  }

  get f() {
    return this.employeForm.controls;
  }

  onSubmitForm() {
    this.submitted = true;

    if (this.employeForm.invalid) {
      if (this.employeForm['prenom'].errors) {
        // console.log(this.employeForm['siretCommercant'].errors);
      }

      if (this.employeForm['nom'].errors) {
        // console.log(this.employeForm['siretCommercant'].errors);
      }

      if (this.employeForm['tel'].errors) {
        // console.log(this.employeForm['siretCommercant'].errors);
      }

      if (this.employeForm['email'].errors) {
        // console.log(this.employeForm['siretCommercant'].errors);
      }

      this.submitted = false;
      return;
    } else {
      const email = this.f.email.value;
      if (this.f.email.value && this.f.email.value !== this.originEmail) {
        this._employeService.emailExist(email).subscribe((res: any) => {
          // console.log(res);
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
    // this._router.navigate(['/listEntreprise']);
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
}
