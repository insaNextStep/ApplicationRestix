import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IEmploye } from 'src/app/_models/employe.interface';
import { MatTableDataSource } from '@angular/material';
import { EmployeService } from 'src/app/_services/employe.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TransactionService } from 'src/app/_services/transaction.service';
import { ITransaction } from 'src/app/_models/transaction.interface';
import { MTransaction } from 'src/app/_models/transactions.model';

@Component({
  selector: 'app-active-compte',
  templateUrl: './active-compte.component.html',
  styleUrls: ['./active-compte.component.scss']
})
export class ActiveCompteComponent implements OnInit, OnDestroy {
  // initialisation d'un tableau d'employés vide :

  transactions: MTransaction[];
  transactionsSubscription: Subscription;
  displayColumns = ['date', 'commercant', 'montant'];
  private actuelEmploye: any;
  // const id = 0;

  valeur = 20;
  messageSolde = 'Solde restant : ';
  valeurArc = [(this.valeur / 20.0000001) * 100];
  // arcDelimiters est une valeur en % de la jauge
  canvasWidth = 600;
  needleValue = 20;
  centralLabel = '' + this.valeur.toFixed(2) + '€';
  name = 'Solde Journalier';
  bottomLabel = '' + 50;
  options = {
    hasNeedle: false,
    needleColor: 'green',
    needleUpdateSpeed: 1000,
    arcColors: ['green', 'lightgray'],
    arcDelimiters: [0.001],
    needleStartValue: 0.001
  };

  constructor(
    private _employeService: EmployeService,
    private _router: Router,
    private _authService: AuthService,
    private _jwtHelperService: JwtHelperService,
    private _transactionService: TransactionService,
  ) {

  }

  initList(id) {
    this.transactionsSubscription = this._transactionService.getTransactions(id).subscribe(
      (transactions: MTransaction[]) => {
        this.transactions = transactions;
        console.log(this.transactions);
      }
    );
  }

  // afficherTransactions(id) {
  //   this._transactionService.getTransactions(id);
  // }

  MaJGraphe(id) {
    this._employeService.getSolde(id).subscribe(
      (solde: any) => {
        this.valeur = solde.soldeJour.toFixed(2);
        console.log('solde du jour : ', this.valeur);
        this.messageSolde += '' + solde.soldeTotal.toFixed(2);
        console.log(solde);
        if (this.valeur >= 8) {
          this.options.arcColors = ['green', 'lightgray'];
        } else {
          if (this.valeur <= 5) {
            this.options.arcColors = ['red', 'lightgray'];
          } else {
            this.options.arcColors = ['orange', 'lightgray'];
          }
        }
        if (this.valeur < 0.01) {
          this.valeur = 0.001;
          this.centralLabel = '0';
        }
        console.log('valeur :', this.valeur);
        this.options.arcDelimiters[0] = (this.valeur / 20.0000001) * 100;
        this.centralLabel = '' + this.valeur  + '€';
        this.valeurArc[0] = (this.valeur / 20.0000001) * 100;
        console.log(this.valeurArc, this.valeur, this.options.arcDelimiters);
      });
  }

  ngOnInit() {
    // recupération du token
    const token = this._authService.getToken();
    console.log('token : ' + token);

    // si token existe alors
    if (token) {
      // décoder le token et récupérer l'id de l'employe
      const decodeToken = this._jwtHelperService.decodeToken(token);
      console.log('employeId : ' + decodeToken.subject);

      // this.afficherTransactions(decodeToken.subject);
      this.initList(decodeToken.subject);
      this.MaJGraphe(decodeToken.subject);
    } else {
      this.actuelEmploye = '';
    }
    console.log(this._authService.currentEmployeValue);

  }

  ngOnDestroy() {
    this.transactionsSubscription.unsubscribe();
  }
}
