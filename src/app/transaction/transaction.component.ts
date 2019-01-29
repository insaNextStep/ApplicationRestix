import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
/*
Pour l'application des transaction,
il serait intéressant de faire en sorte que
chaque instance  d'  transactionComponent  ait
un nom différent qu'on puisse régler depuis
l'extérieur du code.  Pour ce faire, il faut
utiliser le décorateur  @Input()  en remplaçant
la déclaration de la variable  transNumero
*/
  @Input() transNumero: Number;
  // @Input() permet d'avoir transNumero comme paramètre dans la page html
  @Input() transMontant: Number; // Initialisation de l'une des variables

  constructor() { }

  ngOnInit() {
  }

  getMontant() {
    return this.transMontant;
  }

  getColor() {
    // tslint:disable-next-line:no-unused-expression
    // couleur: String;
    if (10 > this.transMontant) {
      const couleur = 'orange';
      return couleur;
    }
  }
}
