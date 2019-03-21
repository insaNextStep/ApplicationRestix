import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MEntreprise } from 'src/app/_models/entreprise.model';
import { IEntreprise } from 'src/app/_models/entreprise.interface';
import { EntrepriseService } from 'src/app/_services/entreprise.service';

@Component({
  selector: 'app-new-entreprise',
  templateUrl: './new-entreprise.component.html',
  styleUrls: ['./new-entreprise.component.scss']
})
export class NewEntrepriseComponent implements OnInit {
  // tslint:disable-next-line:member-ordering
  entrepriseForm: FormGroup;
  entreprise: IEntreprise;
  status = 'Formulaire d\'inscription';
  idEntreprise = '';
  submitted = false;

  loginExist = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _entrepriseService: EntrepriseService,
    private route: ActivatedRoute
  ) {
    if (this.route.params['value'].id) {
      this.status = 'Editer profil';
      // this.statusBoutton = 'Mise à jour';
    }

    this.route.paramMap.subscribe(params => {
      this.idEntreprise = params.get('id');
      if (this.idEntreprise) {
        this.recupererEntreprise(this.idEntreprise);
      }
    });
  }

  statusBoutton = 'Soumettre';

  recupererEntreprise(id: string) {
    this._entrepriseService
      .getEntreprise(id)
      .subscribe(
        entreprise => this.editEntreprise(entreprise),
        err => console.log('Erreur chargement : ' + err)
      );
  }

  editEntreprise(entreprise) {
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
          Validators.maxLength(14),
          Validators.pattern(/^[1-9][0-9]{13}$/)
        ]
      ]
    });
  }

  // initForm() {
  //   this.entrepriseForm = this._formBuilder.group({
  //     nomEntreprise: ['', Validators.required],
  //     tel: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     ibanEntreprise: ['', Validators.required],
  //     siretEntreprise: ''
  //   });
  // }

  get f() {
    return this.entrepriseForm.controls;
  }

  onSubmitForm(event) {
    const email = this.f.email.value;
    if (this.f.email.value) {
      this._entrepriseService.emailExist(email).subscribe((res: any) => {
        console.log(res);
        if (res.message === 'err') {
          this.loginExist = true;
          return;
        } else {
          this.loginExist = false;
          this.faireSubmit(event);
        }
      });
    }

    this.submitted = true;

    if (this.entrepriseForm.invalid) {
      if (this.entrepriseForm['siretCommercant'].errors) {
        // console.log(this.entrepriseForm['siretCommercant'].errors);
      }

      if (this.entrepriseForm['nomCommercant'].errors) {
        // console.log(this.entrepriseForm['siretCommercant'].errors);
      }

      if (this.entrepriseForm['tel'].errors) {
        // console.log(this.entrepriseForm['siretCommercant'].errors);
      }

      if (this.entrepriseForm['email'].errors) {
        // console.log(this.entrepriseForm['siretCommercant'].errors);
      }

      if (this.entrepriseForm['ibanCommercant'].errors) {
        // console.log(this.entrepriseForm['siretCommercant'].errors);
      }

      this.submitted = false;
      return;
    }
  }

  // focusOutFunction(event: string) {
  //   this.loginExist = false;

  //   if (event['path'][0].value) {
  //     const email = event['path'][0].value;
  //     this._entrepriseService.emailExist(email).subscribe((res: any) => {
  //       console.log(res);
  //       if (res.message === 'err') {
  //         this.loginExist = true;
  //       }
  //     });
  //   }
  // }

  faireSubmit (event) {
    const formValue = this.entrepriseForm.value;
    const newEntreprise = new MEntreprise(
      formValue['nomEntreprise'],
      formValue['tel'],
      formValue['email'],
      formValue['ibanEntreprise'],
      formValue['siretEntreprise']
    );

    if (event === 'Formulaire d\'inscription') {
      console.log('event : add');
      this._entrepriseService.addEntreprise(newEntreprise);
      this._router.navigate(['/listEntreprises']);
    } else {
      console.log('event : update');
      this._entrepriseService
        .updateEntreprise(newEntreprise, this.idEntreprise)
        .pipe(first())
        .subscribe(
          () => {
            this._router.navigate(['/listEntreprises']);
          },
          err => console.log('Erreur : ' + err)
        );
    }
    // this._router.navigate(['/listEntreprises']);
  }

}
