import { Component, OnInit, Input } from '@angular/core';
// ajout du modèle de la base de données à utilisé pour la liste des employés
import { ITransaction } from '../_models/transaction.interface';
// importation du service de gestion des employés
import { TransactionService } from '../_services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  providers: [TransactionService]
})
export class TransactionsComponent implements OnInit {
  // initialisation d'un tableau d'employés vide :
  listetransactions: ITransaction[];
  displayColumns = ['_id', 'name', 'tel', 'email'];

  constructor(private transactionService: TransactionService) {}

  // getEmployes(id) {
  //   // initialisation de la méthode pour récupérer les employés
  //   this.transactionService.getListTransactions(id).subscribe(transactions  => {
  //   this.listetransactions = transactions as Array<ITransaction>;
  //   });
  // }

  ngOnInit() {
    // this.getEmployes();
  }
}
