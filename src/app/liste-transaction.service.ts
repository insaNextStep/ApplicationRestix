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
export class ListeChopService {
  uri = 'http://localhost:3000';
  // création d'un instance avec http
  constructor(private http: HttpClient) {}

  getListeChops() {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this.http.get(this.uri + '/chophouses/'); // .pipe(map(res => res));
  }

  getChop(id) {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this.http.get(this.uri + '/chophouses/${id}'); // .pipe(map(res => res));
  }

  // addNewChop(newChop) {
  // implémentation de la route (repris de node js dans l'onglet route)
  // const headers = new HttpHeaders();
  // headers.append('Content-type', 'application/json');
  // return this.http.post(this.uri + '/Chops/', newChop, { headers: this.headers });
  // .pipe(map(res => res));
  // }

  // deleteChop(id) {
  //   // implémentation de la route (repris de node js dans l'onglet route)
  //   return this.http.delete(this.uri + '/Chops/${id}');
  //     // .pipe(map(res => res));
  // }
}
