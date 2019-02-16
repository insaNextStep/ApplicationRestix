import { Component, OnInit, Input } from '@angular/core';
// ajout du modèle de la base de données à utilisé pour la liste des employés
import { employee } from '../schemas/schemaEmployee';
// importation du service de gestion des employés
import { EmployeeService } from '../services/liste-employee.service';


import { Router } from '@angular/router';
import { ConsoleReporter } from 'jasmine';


@Component({
  selector: 'app-liste-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {
  // initialisation d'un tableau d'employés vide :
  listeEmployees: employee[];
  displayColumns = ['id', 'name', 'phone', 'email', 'edit', 'supprimer'];

  constructor(private employeeService: EmployeeService, private router: Router) { }

  getEmployes() {
    // initialisation de la méthode pour récupérer les employés
    this.employeeService.getListEmployees().subscribe(employees => {
      this.listeEmployees = employees as Array<employee>;
    });
  }

  ajouterEmployer() {
    this.router.navigate(['/register']);
  }
  actionEmploye(event: string, id: string) {
    if (event === 'éditer') {
      console.log('Editer : ' + id);
    } else {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        console.log('Id ' + id + 'supprimer');
        this.router.navigate(['/list-employees']);
      });
    }
  }

  ngOnInit() {
    this.getEmployes();
  }
}
