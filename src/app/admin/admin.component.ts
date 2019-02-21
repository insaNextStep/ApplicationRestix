import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../_services/employee.service';
import { first } from 'rxjs/operators';
import { IEmployee } from '../_models/employee.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  employes: IEmployee[] = [];
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService
      .getListEmployees()
      .pipe(first())
      .subscribe(employes => {
        this.employes = employes;
      });
  }
}
