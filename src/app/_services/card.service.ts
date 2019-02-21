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
export class CardService {
  uri = 'http://localhost:3000';
  // création d'un instance avec http
  constructor(private http: HttpClient) {}

  getListeCards() {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this.http.get(this.uri + '/creditcards/').pipe(map(res => res));
  }

  getCard(id) {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this.http.get(this.uri + '/creditcards/${id}');
      // .pipe(map(res => res));
  }
}
