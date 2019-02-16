import { Component, OnInit } from '@angular/core';
import { Employe } from '../models/Employe.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/liste-employee.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [EmployeeService]
})
export class RegisterComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private router: Router) { }

  newEmployee: Employe;

  ngOnInit() {
  }

  userRegister(form: NgForm) {
    this.newEmployee = form.value;
    this.ajouterEmploye(this.newEmployee);
  }

  ajouterEmploye(newEmploye: Employe) {
    this.employeeService.addNewEmployee(newEmploye).subscribe(unEmploye => {
      this.newEmployee = unEmploye as Employe;
      this.router.navigate(['/list-employees']);
    });
  }

  openCity(evt, cityName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    
    tablinks = document.getElementsByClassName('tablinks');
    
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    
    document.getElementById(cityName).style.display = 'block';
    evt.currentTarget.className += ' active';
  }
}
