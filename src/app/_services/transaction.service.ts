import { Injectable } from '@angular/core';
// importer les fonctionnalité de HTTP pour travailler avec les méthode réposne/header
// import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';
// ajout de l'opérateur 'map'
import { map } from 'rxjs/operators';
import { MTransaction } from '../_models/transactions.model';
import { Observable, Subject } from 'rxjs';

// import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions: MTransaction[] = [];
  transactionSubject = new Subject<MTransaction[]>();

  constructor(private _httpClient: HttpClient) {}

  // private uriEmploye = 'http://localhost:3000/employes/transactions';
  private uriEmploye = 'https://restix.herokuapp.com/employes/transactions';

  emitTransaction() {
    this.transactionSubject.next(this.transactions.slice());
  }

  getListTransactions(id: string) {
    // implémentation de la route (repris de node js dans l'onglet route)
    this._httpClient.get<any[]>(`${this.uriEmploye}/list/`).subscribe(
      res => {
        this.transactions = res;
        this.emitTransaction();
        // console.log(this.transactions);
      },
      // err => console.log('Erreur : ' + err)
    );
  }

  getTransactions(id: string): Observable<MTransaction[]> {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this._httpClient
      .get<MTransaction[]>(`${this.uriEmploye}/${id}`)
      .pipe(map(res => res));
  }

  // getTransactions(id) {
  //   console.log(`getTransactions(${id})`);
  //   return this._httpClient.get(`${this.uriEmploye}/transactions/${id}`);
  // }

  getListTransaction() {
    // implémentation de la route (repris de node js dans l'onglet route)
    this._httpClient.get<any[]>(`${this.uriEmploye}/list/`).subscribe(
      res => {
        this.transactions = res;
        this.emitTransaction();
        // console.log(this.commercants);
      },
      // err => console.log('Erreur : ' + err)
    );
  }
}
