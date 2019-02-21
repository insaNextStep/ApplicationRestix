import { Component, OnInit, Input } from '@angular/core';
// ajout du modèle de la base de données à utilisé pour la liste des employés
import { IEmployee } from '../../_models/employee.interface';
// importation du service de gestion des employés
import { EmployeeService } from '../../_services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';


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

  constructor(private employeeService: EmployeeService, private _router: Router, private route: ActivatedRoute) { }

  afficherListeEmployes() {
    // initialisation de la méthode pour récupérer les employés
    this.employeeService.getListEmployees().subscribe(
      res => (this.listeEmployees = res),
      err => {
        if (err instanceof HttpErrorResponse) {
          console.log('erreur :' + err);
          if (err.status === 401) {
            this._router.navigate(['login']);
          }
        }
      }
    );
  }

  ajouterEmployer() {
    this._router.navigate(['register']);
  }

  actionEmploye(event: string, id: string) {
    if (event === 'éditer') {
      console.log('Editer : ' + id);
    } else {
      this.employeeService.DissocierEmployee(id).pipe(first()).subscribe(() => {
        this.afficherListeEmployes();
      });
    }
  }

  ngOnInit() {
    this.afficherListeEmployes();
  }
}
