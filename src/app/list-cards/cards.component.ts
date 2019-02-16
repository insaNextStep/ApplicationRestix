import { Component, OnInit } from '@angular/core';
// ajout du modèle de la base de données à utilisé pour la liste des employés
import { card } from '../schemas/schemaCard';
// importation du service de gestion des cartes
import { CardService } from '../services/liste-card.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  providers: [CardService]
})
export class CardsComponent implements OnInit {
  // initialisation d'un tableau d'employés vide :
  listeCards: card[];
  displayColumns = ['number', 'status', 'company', 'employee', 'url'];

  constructor(private cardService: CardService) {}

  getEmployes() {
    // initialisation de la méthode pour récupérer les employés
    this.cardService.getListeCards().subscribe(creditCards => {
      this.listeCards = creditCards as Array<card>;
      console.log(this.listeCards);
    });
  }

  ngOnInit() {
    this.getEmployes();
  }
}
