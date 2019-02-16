import { Component, OnInit, Input } from '@angular/core';
// ajout du modèle de la base de données à utilisé pour la liste des employés
import { employee } from '../../schemaEmployee';
// importation du service de gestion des employés
import { ListeAgentService } from '../../liste-chop.service';

@Component({
  selector: 'app-liste-employees',
  templateUrl: './liste-employees.component.html',
  styleUrls: ['./liste-employees.component.scss'],
  providers: [ListeAgentService]
})
export class ListeEmployeesComponent implements OnInit {
  // initialisation d'un tableau d'employés vide :
  listeEmployees: employee[];
  displayColumns = ['_id', 'name', 'phone', 'email'];

  constructor(private listeAgentService: ListeAgentService) {}

  getEmployes() {
    // initialisation de la méthode pour récupérer les employés
    this.listeAgentService.getListeEmployees().subscribe(employees  => {
    this.listeEmployees = employees as Array<employee>;
    });
  }

  ngOnInit() {
    this.getEmployes();
  }
}
