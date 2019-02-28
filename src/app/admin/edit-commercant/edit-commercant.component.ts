import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommercantService } from 'src/app/_services/commercant.service';
import { MCommercant } from 'src/app/_models/commercant.model';

@Component({
  selector: 'app-edit-commercant',
  templateUrl: './edit-commercant.component.html',
  styleUrls: ['./edit-commercant.component.scss']
})
export class EditCommercantComponent implements OnInit {

  commercantForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _commercantService: CommercantService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {

    this.commercantForm = this._formBuilder.group({
      id: '',
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmitForm() {
    const formValue = this.commercantForm.value;
    const newCommercant = new MCommercant(
      formValue['name'],
      formValue['phone'],
      formValue['email']
    );
    this._commercantService.addCommercant(newCommercant);
    this._router.navigate(['/listCommercant']);
  }
}

