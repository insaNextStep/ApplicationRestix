import { Component, OnInit, Input } from '@angular/core';
// ajout du modèle de la base de données à utilisé pour la liste des employés
import { transaction } from '../schemas/schemaTransaction';
// importation du service de gestion des employés
import { TransactionService } from '../services/liste-transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  providers: [TransactionService]
})
export class TransactionsComponent implements OnInit {
  // initialisation d'un tableau d'employés vide :
  listetransactions: transaction[];
  displayColumns = ['_id', 'name', 'phone', 'email'];

  constructor(private transactionService: TransactionService) {}

  getEmployes() {
    // initialisation de la méthode pour récupérer les employés
    this.transactionService.getListetransactions().subscribe(transactions  => {
    this.listetransactions = transactions as Array<transaction>;
    });
  }

  ngOnInit() {
    this.getEmployes();
  }
}
