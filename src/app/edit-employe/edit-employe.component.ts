import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/liste-employee.service';
import { Router } from '@angular/router';
import { IEmployee } from '../schemas/schemaEmployee';

@Component({
  selector: 'app-edit-employe',
  templateUrl: './edit-employe.component.html',
  styleUrls: ['./edit-employe.component.scss']
})
export class EditEmployeComponent implements OnInit {
  constructor(private _employe: EmployeeService, private _route: Router) {}

  editEmploye = {};


  ngOnInit() {}
}
