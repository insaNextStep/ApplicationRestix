import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { IEmployee } from '../_models/employee.interface';
import { EmployeeService } from '../_services/employee.service';
import { AuthService } from '../_services/auth.service';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentEmploye: IEmployee;
    employeFromApi: IEmployee[];

    constructor(
        private _employeeService: EmployeeService,
        private _authService: AuthService
    ) {
        // this.currentEmploye = this._authService.currentEmployeValue;
    }

    ngOnInit() {
        this._employeeService.getEmployee(this.currentEmploye._id).pipe(first()).subscribe(employe => {
            this.employeFromApi = employe;
        });
    }
}
