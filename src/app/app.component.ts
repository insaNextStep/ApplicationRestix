import { Component, Input } from '@angular/core';

/*
selector  : il s'agit du nom qu'on utilisera comme balise
HTML pour afficher ce component, comme vous l'avez vu avec
<app-root>  . Ce nom doit être unique et ne doit pas être
un nom réservé HTML de type  <div>  ,  <body>  etc. On utilisera
donc très souvent un préfixe comme  app  , par exemple ;
templateUrl  : le chemin vers le code HTML à injecter ;
styleUrls  : un array contenant un ou plusieurs chemins vers les feuilles de styles qui concernent ce component ;
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// exportation des élements
export class AppComponent {
  @Input() montantAjouter = 0;
  constructor() {
    // méthode constuction d'un timer
    setTimeout(() => {
      this.isAuth = true;
    }, this.msTemps);
  }

  isAuth = false; // autentification par défaut
  totalTransaction = 0;
  // tableau de valeur pouvant provenir de l'extérieur
  transactions = [
    {
      name: 1234,
      value: 20
    },
    {
      name: 2345,
      value: 10
    },
    {
      name: 3456,
      value: -5
    }
  ];

  msTemps = 4000; // timer pour activer bouton

  // Sommes des transactionss
  totalTrans() {
    let newLocal = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      newLocal = newLocal + this.transactions[i].value;
    }
    this.totalTransaction = newLocal;
    return this.totalTransaction;
  }

  ajouter(newLocal) {
    for (let i = 0; i < this.transactions.length; i++) {
      this.transactions[i].value = Number(newLocal) + this.transactions[i].value;
      console.log(this.transactions[i].value + ' --- ' + newLocal);
    }
  }
}
