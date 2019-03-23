import { Injectable } from '@angular/core';
// importer les fonctionnalité de HTTP pour travailler avec les méthode réposne/header
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MEntreprise } from '../_models/entreprise.model';
import { IEntreprise } from '../_models/entreprise.interface';

// import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  private entreprises: MEntreprise[] = [];
  entrepriseSubject = new Subject<MEntreprise[]>();

  // private uri = 'http://localhost:3000/entreprises';
  private uri = 'https://restix.herokuapp.com/entreprises';
  // création d'un instance avec http
  constructor(private _httpClient: HttpClient) {}

  emitEntreprise() {
    this.entrepriseSubject.next(this.entreprises.slice());
  }

  getListeEntreprises() {
    // implémentation de la route (repris de node js dans l'onglet route)
    this._httpClient.get<any[]>(this.uri + '/list').subscribe(
      res => {
        this.entreprises = res;
        this.emitEntreprise();
        // console.log(this.commercants);
      },
      err => console.log('Erreur : ' + err)
    );
  }

  getEntreprise(id) {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this._httpClient
    .get<MEntreprise[]>(`${this.uri}/${id}`)
    .pipe(map(res => res));
  }

  getEntrepriseName(id) {
    console.log(`getEntrepriseName(${id})`);
    return this._httpClient.get(`${this.uri}/name/${id}`);
  }

  getMesEmployes(id) {
    return this._httpClient
    .get(`${this.uri}/mesEmployes/${id}`)
    .pipe(map(res => res));
  }

  addEntreprise(entreprise: MEntreprise) {
    return this._httpClient
      .post(`${this.uri}/add/`, entreprise)
      .subscribe(
        (res: any) => {
          console.log('Enregistrement terminé');
          // this.entreprises.push(res);
          // this.emitEntreprise();
          console.log(res);
          return res;
        },
        err => console.log('Erreur : ' + err)
      );
  }

  updateEntreprise(entreprise, id) {
    console.log(entreprise);
    return this._httpClient
      .patch(`${this.uri}/update/${id}`, entreprise)
      .pipe(map(res => res));
  }

  deleteEntreprise(id: string) {
    return this._httpClient.delete(`${this.uri}/delete/${id}`).pipe(map(res => res));
  }

  emailExist(email: string): Observable<IEntreprise[]> {
    return this._httpClient.get<IEntreprise[]>(`${this.uri}/email/${email}`).pipe(map(res => res));
  }

  getAll() {
    return this._httpClient.get(`${this.uri}/getAll`).pipe(map(res => res));
  }

}
