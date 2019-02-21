import { Injectable } from '@angular/core';
// importer les fonctionnalité de HTTP pour travailler avec les méthode réposne/header
// import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';
// ajout de l'opérateur 'map'
import { map } from 'rxjs/operators';

// import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  uri = 'http://localhost:3000';
  // création d'un instance avec http
  constructor(private http: HttpClient) {}

  getListetransactions() {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this.http.get(this.uri + '/Transactions/'); // .pipe(map(res => res));
  }

  getTransaction(id) {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this.http.get(this.uri + '/Transactions/${id}'); // .pipe(map(res => res));
  }

  // addNewTransactions(newTransactions) {
  // implémentation de la route (repris de node js dans l'onglet route)
  // const headers = new HttpHeaders();
  // headers.append('Content-type', 'application/json');
  // return this.http.post(this.uri + '/Transactionss/', newTransactions, { headers: this.headers });
  // .pipe(map(res => res));
  // }

  // deleteTransaction(id) {
  //   // implémentation de la route (repris de node js dans l'onglet route)
  //   return this.http.delete(this.uri + '/Transactions/${id}');
  //     // .pipe(map(res => res));
  // }
}
