import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../_services/employe.service';
import { first } from 'rxjs/operators';
import { IEmploye } from '../_models/employe.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  employes: IEmploye[] = [];
  constructor(private _employeService: EmployeService) {}

  ngOnInit() {
    this._employeService
      .getListEmployes()
      .pipe(first())
      .subscribe(employes => {
        this.employes = employes;
      });
  }
}
