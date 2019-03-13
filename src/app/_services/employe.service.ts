import { Injectable } from '@angular/core';
// importer les fonctionnalité de HTTP pour travailler avec les méthode réposne/header
// import { Http, Response, Headers } from '@angular/http';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { IEmploye } from '../_models/employe.interface';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { MEmploye } from '../_models/employe.model';
import { ITransaction } from '../_models/transaction.interface';
import { MTransaction } from '../_models/transactions.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private employes: MEmploye[] = [];
  private transactions: ITransaction[] = [];
  // transactionSubject:  new Subject<MTransaction[]>();

  employeSubject = new Subject<MEmploye[]>();
  private uri = 'http://localhost:3000/employes';
  // création d'un instance avec http
  constructor(private _httpClient: HttpClient) {}

  emitEmploye() {
    this.employeSubject.next(this.employes.slice());
  }

  getListEmployes(): Observable<IEmploye[]> {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this._httpClient.get<IEmploye[]>(`${this.uri}/list`).pipe(map(res => res));
  }

  getEmploye(id: string): Observable<IEmploye[]> {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this._httpClient.get<IEmploye[]>(`${this.uri}/${id}`).pipe(map(res => res));
  }

  addNewEmploye(newEmploye) {
    return this._httpClient
    .post(`${this.uri}/add/`, newEmploye)
    .subscribe(
      (res: any) => {
        console.log('Enregistrement terminé');
        this.employes.push(res);
        this.emitEmploye();
      },
      err => console.log('Erreur : ' + err)
    );
    // implémentation de la route (repris de node js dans l'onglet route)
    // const headers = new HttpHeaders();
    // headers.append('Content-type', 'application/json');
    // return this._httpClient.post(`${this.uri}/add/`, newEmployee); // , { headers: this.headers }).pipe(map(res => res));
  }

  deleteEmploye(id: string) {
    return this._httpClient.delete(`${this.uri}/delete/${id}`).pipe(map(res => res));
  }

  DissocierEmploye(id: string): Observable<IEmploye[]> {
    return this._httpClient.get<IEmploye[]>(`${this.uri}/dissocierEmploye/${id}`); // .pipe(map(res => res));
  }

  // editEmployee(id: string): Observable<IEmploye[]> {
  //   return this._httpClient.put<any>(`${this.uri}/edit/${id}`).pipe(map(res => res));
  // }

  getEmployeName(id) {
    console.log(`getEmployeName(${id})`);
    return this._httpClient.get(`${this.uri}/name/${id}`);
  }

  emailExist(email: string): Observable<IEmploye[]> {
    return this._httpClient.get<any>(`${this.uri}/email/${email}`).pipe(map(res => res));
  }

  updateEmploye(employe, id) {
    console.log(employe);
    return this._httpClient
      .patch(`${this.uri}/update/${id}`, employe)
      .pipe(map(res => res));
  }

  getSolde(id) {
    console.log(`getSolde(${id})`);
    return this._httpClient.get(`${this.uri}/solde/${id}`);
  }

}