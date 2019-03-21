import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommercantService } from 'src/app/_services/commercant.service';
import { MCommercant } from 'src/app/_models/commercant.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-new-commercant',
  templateUrl: './new-commercant.component.html',
  styleUrls: ['./new-commercant.component.scss']
})
export class NewCommercantComponent implements OnInit {
  commercantForm: FormGroup;
  commercant: MCommercant;
  status = 'Formulaire d\'inscription';
  idCommercant = '';
  loginExist = false;
  submitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _commercantService: CommercantService,
    private route: ActivatedRoute
  ) {
    if (this.route.params['value'].id) {
      this.status = 'Editer profil';
      // this.statusBoutton = 'Mise à jour';
    }

    this.route.paramMap.subscribe(params => {
      this.idCommercant = params.get('id');
      if (this.idCommercant) {
        this.recupererCommercant(this.idCommercant);
      }
    });
  }

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
          Validators.maxLength(14),
          Validators.pattern(/^[1-9][0-9]{13}$/)
        ]
      ],
      tpe: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12),
          Validators.pattern(/^1[0-9]{11}$/)
        ]
      ]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.commercantForm.controls;
  }

  onSubmitForm(event) {
    const email = this.f.email.value;
    if (this.f.email.value) {
      this._commercantService.emailExist(email).subscribe((res: any) => {
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

    if (this.commercantForm.invalid) {
      if (this.commercantForm['siretCommercant'].errors) {
        // console.log(this.commercantForm['siretCommercant'].errors);
      }

      if (this.commercantForm['nomCommercant'].errors) {
        // console.log(this.commercantForm['siretCommercant'].errors);
      }

      if (this.commercantForm['tel'].errors) {
        // console.log(this.commercantForm['siretCommercant'].errors);
      }

      if (this.commercantForm['email'].errors) {
        // console.log(this.commercantForm['siretCommercant'].errors);
      }

      if (this.commercantForm['ibanCommercant'].errors) {
        // console.log(this.commercantForm['siretCommercant'].errors);
      }

      if (this.commercantForm['tpe'].errors) {
        // console.log(this.commercantForm['siretCommercant'].errors);
      }

      this.submitted = false;
      return;
    }
  }

  faireSubmit(event) {
    const formValue = this.commercantForm.value;
    const newCommercant = new MCommercant(
      formValue['nomCommercant'],
      formValue['tel'],
      formValue['email'],
      formValue['ibanCommercant'],
      formValue['siretCommercant'],
      formValue['tpe']
    );

    if (event === 'Formulaire d\'inscription') {
      console.log('event : add');
      this._commercantService.addCommercant(newCommercant);
      this._router.navigate(['/listCommercants']);
    } else {
      console.log('event : update');
      this._commercantService
        .updateCommercant(newCommercant, this.idCommercant)
        .pipe(first())
        .subscribe(
          () => {
            this._router.navigate(['/listCommercants']);
          },
          err => console.log('Erreur : ' + err)
        );
    }
    // this._router.navigate(['/listCommercants']);
  }

}
