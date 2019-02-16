import { employee } from '../schemas/schemaEmployee';
import { Resolve } from '@angular/router';
import { EmployeeService } from '../services/liste-employee.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
// export class EmployeResolver implements Resolve<employee[]> {
//   constructor(private employes: EmployeeService) {}
//   resolve(): Observable<employee[]> {
//     return this.employes.getListEmployees();
//   }
// }
export class EmployeResolver implements Resolve<employee[]> {
  constructor(private employes: EmployeeService) {}
  resolve(): Observable<employee[]> {
    // tslint:disable-next-line:no-unused-expression
    () => {
      return this.employes.getListEmployees();
    };
  }
}
