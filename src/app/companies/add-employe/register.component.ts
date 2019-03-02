import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../_services/employee.service';
import { AuthService } from '../../_services/auth.service';
import { IEmployee } from '../../_models/employee.interface';
import { CompanyService } from 'src/app/_services/company.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [EmployeeService, AuthService, CompanyService]
})
export class RegisterComponent implements OnInit {
  constructor(
    private _employeeService: EmployeeService,
    private _companyService: CompanyService,
    private _router: Router,
    private _jwtHelperService: JwtHelperService,
    private _authService: AuthService
  ) {}

  private newEmployee: IEmployee;
  private actuelCompany: any;
  private loginExist = false;

  ngOnInit() {
    // console.log(this._authService.currentEmployeValue);
    const token = this._authService.getToken();
    const decodeToken = this._jwtHelperService.decodeToken(token);
    // console.log('Companyid : ' + decodeToken.subject);
    this._companyService.getEntrepriseName(decodeToken.subject).subscribe(
      res => {
        this.actuelCompany = res;
        console.log(this.actuelCompany);
      },
      err => {
        console.log('erreur :' + err);
      }
    );
  }

  donneesFormulaire(form: NgForm) {
    this.newEmployee = form.value;
    this.ajouterEmploye(this.newEmployee);
  }

  private ajouterEmploye(newEmploye: any) {
    newEmploye.company = this.actuelCompany.company;
    this._employeeService.addNewEmployee(newEmploye).subscribe(
      res => {
        console.log(res);
        this._router.navigate(['employees']);
      },
      err => console.log(err)
    );
  }

  focusOutFunction(event: string) {
    // const email =
    if (event['path'][0].value) {
    const email = (event['path'][0].value) ;
    this._employeeService.emailExist(email).subscribe(
      res => this.loginExist = true,
      err => this.loginExist = false
      );
    }
  }

  // openCity(evt, cityName) {
  //   let i, tabcontent, tablinks;
  //   tabcontent = document.getElementsByClassName('tabcontent');

  //   for (i = 0; i < tabcontent.length; i++) {
  //     tabcontent[i].style.display = 'none';
  //   }

  //   tablinks = document.getElementsByClassName('tablinks');

  //   for (i = 0; i < tablinks.length; i++) {
  //     tablinks[i].className = tablinks[i].className.replace(' active', '');
  //   }

  //   document.getElementById(cityName).style.display = 'block';
  //   evt.currentTarget.className += ' active';
  // }
}
