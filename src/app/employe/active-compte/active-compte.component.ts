import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TransactionService } from 'src/app/_services/transaction.service';
import { MTransaction } from 'src/app/_models/transactions.model';

@Component({
  selector: 'app-active-compte',
  templateUrl: './active-compte.component.html',
  styleUrls: ['./active-compte.component.scss']
})
export class ActiveCompteComponent implements OnInit, OnDestroy {
  // initialisation d'un tableau d'employés vide :
  actuelEmploye: any = '';
  transactions: MTransaction[];
  transactionsSubscription: Subscription;
  tableau = [];
  // const id = 0;

  constructor(
    private _authService: AuthService,
    private _jwtHelperService: JwtHelperService,
    private _transactionService: TransactionService
  ) {}

  initList(id) {
    this.transactionsSubscription = this._transactionService
      .getTransactions(id)
      .subscribe((transactions: MTransaction[]) => {
        this.transactions = transactions;
        console.log(this.transactions.sort((a, b) => b.date.localeCompare(a.date)));
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
    } else {
      this.actuelEmploye = '';
    }
    console.log(this._authService.currentEmployeValue);
  }

  ngOnDestroy() {
    this.transactionsSubscription.unsubscribe();
  }
}
