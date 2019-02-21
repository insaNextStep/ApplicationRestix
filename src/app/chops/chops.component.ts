import { Component, OnInit, Input } from '@angular/core';
// ajout du modèle de la base de données à utilisé pour la liste des employés
import { IChop } from '../_models/chop.interface';
// importation du service de gestion des employés
import { ChopService } from '../_services/chop.service';

@Component({
  selector: 'app-chops',
  templateUrl: './chops.component.html',
  styleUrls: ['./chops.component.scss'],
  providers: [ChopService]
})
export class ChopsComponent implements OnInit {
  // initialisation d'un tableau d'employés vide :
  listeChops: IChop[];
  displayColumns = ['_id', 'name', 'phone', 'email'];

  constructor(private chopService: ChopService) {}

  getChops() {
    // initialisation de la méthode pour récupérer les employés
    this.chopService.getListeChops().subscribe(chops  => {
    this.listeChops = chops as Array<IChop>;
    });
  }

  ngOnInit() {
    this.getChops();
  }
}
