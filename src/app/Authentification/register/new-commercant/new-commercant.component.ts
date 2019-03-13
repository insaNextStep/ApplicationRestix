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
  private loginExist = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _commercantService: CommercantService,
    private route: ActivatedRoute
  ) {
    if (this.route.params['value'].id) {
      this.status = 'Edité votre profile';
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
    this.commercantForm.patchValue({
      nomCommercant: commercant.nomCommercant,
      tel: commercant.tel,
      email: commercant.email,
      ibanCommercant: commercant.ibanCommercant,
      siretCommercant: commercant.siretCommercant,
      tpe: commercant.tpe
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.commercantForm = this._formBuilder.group({
      nomCommercant: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ibanCommercant: ['', Validators.required],
      siretCommercant: ['', Validators.required],
      tpe: ['', Validators.required]
    });
  }

  onSubmitForm(event) {
    const formValue = this.commercantForm.value;
    const newCommercant = new MCommercant(
      formValue['nomCommercant'],
      formValue['tel'],
      formValue['email'],
      formValue['ibanCommercant'],
      formValue['siretCommercant'],
      formValue['tpe'],
    );
    if (event === 'Formulaire d\'inscription') {
      console.log('event : add');
      this._commercantService.addCommercant(newCommercant);
      this._router.navigate(['/listCommercants']);
    } else {
      console.log('event : update');
      this._commercantService.updateCommercant(newCommercant, this.idCommercant)
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

  focusOutFunction(event: string) {
    this.loginExist = false;
    if (event['path'][0].value) {
      const email = event['path'][0].value;
      this._commercantService.emailExist(email).subscribe((res: any) => {
        console.log(res);
        if (res.message === 'err') {
          this.loginExist = true;
        }
      });
    }
  }
}
