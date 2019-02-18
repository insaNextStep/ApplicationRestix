import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/liste-employee.service';
import { AuthService } from '../services/auth.service';
import { IEmployee } from '../schemas/schemaEmployee';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [EmployeeService, AuthService]
})
export class RegisterComponent implements OnInit {
  constructor(
    private _employee: EmployeeService,
    private router: Router
  ) {}

  newEmployee: IEmployee;

  ngOnInit() {}

  donneesFormulaire(form: NgForm) {
    this.newEmployee = form.value;
    this.ajouterEmploye(this.newEmployee);
  }

  ajouterEmploye(newEmploye: IEmployee) {
    this._employee.addNewEmployee(newEmploye).subscribe(
      res => {
        this.router.navigate(['list-employees']);
        console.log(res);
      },
      err => console.log(err)
    );
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
