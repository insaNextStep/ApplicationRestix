import { Component, OnInit, Input } from '@angular/core';
// ajout du modèle de la base de données à utilisé pour la liste des employés
import { creditCard } from '../../schemaCard';
// importation du service de gestion des cartes
import { CardService } from '../../liste-card.service';

@Component({
  selector: 'app-liste-credit-cards',
  templateUrl: './liste-credit-cards.component.html',
  styleUrls: ['./liste-credit-cards.component.scss'],
  providers: [CardService]
})
export class ListeCreditCardsComponent implements OnInit {
  // initialisation d'un tableau d'employés vide :
  listeCards: creditCard[];
  displayColumns = ['_id', 'number', 'status', 'company', 'employee'];

  constructor(private cardService: CardService) {}

  getEmployes() {
    // initialisation de la méthode pour récupérer les employés
    this.cardService.getListeCreditCards().subscribe(creditCards => {
      this.listeCards = creditCards as Array<creditCard>;
      console.log(this.listeCards);
    });
  }

  ngOnInit() {
    this.getEmployes();
  }
}
