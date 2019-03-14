import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeService } from '../../_services/employe.service';
import { AuthService } from '../../_services/auth.service';
import { IEmploye } from '../../_models/employe.interface';
import { MEmploye } from 'src/app/_models/employe.model';
import { first } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EntrepriseService } from 'src/app/_services/entreprise.service';

@Component({
  selector: 'app-new-employe',
  templateUrl: './new-employe.component.html',
  styleUrls: ['./new-employe.component.scss'],
})
export class NewEmployeComponent implements OnInit {
  // tslint:disable-next-line:member-ordering
  employeForm: FormGroup;
  employe: MEmploye;
  status = 'Formulaire d\'inscription';
  idEmploye = '';
  private actuelEntreprise: any;

  loginExist = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _employeService: EmployeService,
    private route: ActivatedRoute,
    private _jwtHelperService: JwtHelperService,
    private _entrepriseService: EntrepriseService,
    private _authService: AuthService
  ) {
    console.log(this.status);
    if (this.route.params['value'].id) {
      this.status = 'Edité votre profile';
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
        err => console.log('Erreur chargement : ' + err)
      );
  }

  editEmploye(employe) {
    this.employeForm.patchValue({
      nom: employe.nom,
      prenom: employe.prenom,
      tel: employe.tel,
      email: employe.email
    });
  }

  initForm() {
    this.employeForm = this._formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmitForm(event) {
    const formValue = this.employeForm.value;
    formValue.entreprise = this.actuelEntreprise;
    const newEmploye = new MEmploye (
      formValue['nom'],
      formValue['prenom'],
      formValue['tel'],
      formValue['email'],
      formValue['entreprise']
    );
    console.log(newEmploye);
    if (event === 'Formulaire d\'inscription') {
      console.log('event : add');
      this._employeService.addNewEmploye(newEmploye);
      this._router.navigate(['/mesEmployes']);
    } else {
      console.log('event : update');
      this._employeService
        .updateEmploye(newEmploye, this.idEmploye)
        .pipe(first())
        .subscribe(
          () => {
            this._router.navigate(['/mesEmployes']);
          },
          err => console.log('Erreur : ' + err)
        );
    }
    // this._router.navigate(['/listEntreprise']);
  }

  ngOnInit() {
    // console.log(this._authService.currentEmployeValue);
    const token = this._authService.getToken();
    console.log('token : ' + token);
    if (token) {
      const decodeToken = this._jwtHelperService.decodeToken(token);
      console.log('entrepriseId : ' + decodeToken.subject);
      this._entrepriseService.getEntrepriseName(decodeToken.subject).subscribe(
        res => {
          this.actuelEntreprise = res;
          console.log(this.actuelEntreprise);
        },
        err => {
          console.log('erreur :' + err);
        }
      );
    } else {
      this.actuelEntreprise = '';
    }
    // console.log(this._authService.currentEmployeValue);
    this.initForm();
  }

  focusOutFunction(event: string) {
    this.loginExist = false;
    if (event['path'][0].value) {
      const email = event['path'][0].value;
      this._employeService.emailExist(email).subscribe((res: any) => {
        console.log(res);
        if (res.message === 'err') {
          this.loginExist = true;
        }
      });
    }
  }
}
