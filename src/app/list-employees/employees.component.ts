import { Component, OnInit, Input } from '@angular/core';
// ajout du modèle de la base de données à utilisé pour la liste des employés
import { IEmployee } from '../schemas/schemaEmployee';
// importation du service de gestion des employés
import { EmployeeService } from '../services/liste-employee.service';


import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-liste-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {
  // initialisation d'un tableau d'employés vide :
  listeEmployees: IEmployee[];
  displayColumns = ['id', 'name', 'phone', 'email', 'company', 'edit', 'supprimer'];

  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) { }

  afficherListeEmployes() {
    // initialisation de la méthode pour récupérer les employés
    this.employeeService.getListEmployees()
      .subscribe(data => this.listeEmployees = data);
  }

  ajouterEmployer() {
    this.router.navigate(['register']);
  }

  actionEmploye(event: string, id: string) {
    if (event === 'éditer') {
      console.log('Editer : ' + id);
    } else {
      this.employeeService.DissocierEmployee(id).subscribe(() => {
        this.afficherListeEmployes();
      });
    }
  }

  ngOnInit() {
    this.afficherListeEmployes();
  }
}
