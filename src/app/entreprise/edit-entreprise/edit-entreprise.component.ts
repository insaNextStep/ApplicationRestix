import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MEntreprise } from 'src/app/_models/entreprise.model';
import { IEntreprise } from 'src/app/_models/entreprise.interface';
import { EntrepriseService } from 'src/app/_services/entreprise.service';
import { AuthService } from 'src/app/_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-edit-entreprise',
  templateUrl: './edit-entreprise.component.html',
  styleUrls: ['./edit-entreprise.component.scss']
})
export class EditEntrepriseComponent implements OnInit {
  // tslint:disable-next-line:member-ordering
  entrepriseForm: FormGroup;
  entreprise: IEntreprise;
  idEntreprise = '';
  submitted = false;
  originEmail = '';

  loginExist = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _entrepriseService: EntrepriseService,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private _jwtHelperService: JwtHelperService
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

  onSubmitForm() {
    console.log('onSubmitForme');

    this.submitted = true;

    if (this.entrepriseForm.invalid) {
      console.log('invalide', this.entrepriseForm);
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
    } else {
      const email = this.f.email.value;
      if (this.f.email.value && (this.f.email.value !== this.originEmail)) {
        console.log('changement email');
        this._entrepriseService.emailExist(email).subscribe((res: any) => {
          // console.log(res);
          if (res.message === 'err') {
            this.loginExist = true;
            return;
          } else {
            this.loginExist = false;
          }
        });
      } else {
        this.faireSubmit();
      }
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
        (resultat) => {
          console.log('resultat', resultat);
          this._authService.regUser(resultat);
          this._router.navigate(['/mesEmployes']);
        },
        err => console.log('Erreur : ' + err)
      );
    // this._router.navigate(['/listEntreprises']);
  }
}
