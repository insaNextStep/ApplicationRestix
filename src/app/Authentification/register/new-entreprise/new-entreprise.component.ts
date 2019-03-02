import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/_services/company.service';
import { first } from 'rxjs/operators';
import { MEntreprise } from 'src/app/_models/entreprise.model';
import { ICompany } from 'src/app/_models/company.interface';

@Component({
  selector: 'app-new-entreprise',
  templateUrl: './new-entreprise.component.html',
  styleUrls: ['./new-entreprise.component.scss']
})
export class NewEntrepriseComponent implements OnInit {


  // tslint:disable-next-line:member-ordering
  entrepriseForm: FormGroup;
  entreprise: ICompany;
  status = 'Formulaire d\'inscription';
  idEntreprise = '';
  private loginExist = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _entrepriseService: CompanyService,
    private route: ActivatedRoute
  ) {
    if (this.route.params['value'].id) {
      this.status = 'Edité votre profile';
      // this.statusBoutton = 'Mise à jour';
    }

    this.route.paramMap.subscribe(params => {
      this.idEntreprise = params.get('id');
      if (this.idEntreprise) {
        this.recupererCompany(this.idEntreprise);
      }
    });
  }

  statusBoutton = 'Soumettre';
  recupererCompany(id: string) {
    this._entrepriseService
      .getEntreprise(id)
      .subscribe(
        entreprise => this.editEntreprise(entreprise),
        err => console.log('Erreur chargement : ' + err)
      );
  }

  editEntreprise(entreprise) {
    this.entrepriseForm.patchValue({
      name: entreprise.name,
      phone: entreprise.phone,
      email: entreprise.email
    });
  }

  initForm() {
    this.entrepriseForm = this._formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmitForm(event) {
    const formValue = this.entrepriseForm.value;
    const newEntreprise = new MEntreprise(
      formValue['name'],
      formValue['phone'],
      formValue['email']
    );
    if (event === 'Formulaire d\'inscription') {
      console.log('event : add');
      this._entrepriseService.addEntreprise(newEntreprise);
    } else {
      console.log('event : update');
      this._entrepriseService
        .updateEntreprise(newEntreprise, this.idEntreprise)
        .pipe(first())
        .subscribe(
          () => {
            this._router.navigate(['/listCompany']);
            // this.initList();
          },
          err => console.log('Erreur : ' + err)
        );
    }
    // this._router.navigate(['/listCompany']);
  }

  ngOnInit(): void {
    this.initForm();
  }

  focusOutFunction(event: string) {
    const email = event['path'][0].value;
    this._entrepriseService.emailExist(email).subscribe(
      res => this.loginExist = true,
      err => this.loginExist = false
    );
  }
}
