import { Component, OnInit, Input } from '@angular/core';
// ajout du modèle de la base de données à utilisé pour la liste des employés
import { chop } from '../schemas/schemaChop';
// importation du service de gestion des employés
import { ChopService } from '../services/liste-chop.service';

@Component({
  selector: 'app-chops',
  templateUrl: './chops.component.html',
  styleUrls: ['./chops.component.scss'],
  providers: [ChopService]
})
export class ChopsComponent implements OnInit {
  // initialisation d'un tableau d'employés vide :
  listeChops: chop[];
  displayColumns = ['_id', 'name', 'phone', 'email'];

  constructor(private chopService: ChopService) {}

  getChops() {
    // initialisation de la méthode pour récupérer les employés
    this.chopService.getListeChops().subscribe(chops  => {
    this.listeChops = chops as Array<chop>;
    });
  }

  ngOnInit() {
    this.getChops();
  }
}
