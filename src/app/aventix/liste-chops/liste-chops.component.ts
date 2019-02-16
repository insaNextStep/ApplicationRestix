import { Component, OnInit, Input } from '@angular/core';
// ajout du modèle de la base de données à utilisé pour la liste des employés
import { chop } from '../../chop';
// importation du service de gestion des employés
import { ListeChopService } from '../../liste-chop.service';

@Component({
  selector: 'app-liste-chops',
  templateUrl: './liste-chops.component.html',
  styleUrls: ['./liste-chops.component.scss'],
  providers: [ListeChopService]
})
export class ListechopsComponent implements OnInit {
  // initialisation d'un tableau d'employés vide :
  listeChops: chop[];
  displayColumns = ['_id', 'name', 'phone', 'email'];

  constructor(private listeChopService: ListeChopService) {}

  getChops() {
    // initialisation de la méthode pour récupérer les employés
    this.listeChopService.getListeChops().subscribe(chops  => {
    this.listeChops = chops as Array<chop>;
    });
  }

  ngOnInit() {
    this.getChops();
  }
}
