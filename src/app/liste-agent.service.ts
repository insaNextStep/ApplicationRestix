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
export class ListeAgentService {
  uri = 'http://localhost:3000';
  // création d'un instance avec http
  constructor(private http: HttpClient) {}

  getListeEmployees() {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this.http.get(this.uri + '/employees/'); // .pipe(map(res => res));
  }

  getEmployee(id) {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this.http.get(this.uri + '/employees/${id}'); // .pipe(map(res => res));
  }

  // addNewEmployee(newEmployee) {
  // implémentation de la route (repris de node js dans l'onglet route)
  // const headers = new HttpHeaders();
  // headers.append('Content-type', 'application/json');
  // return this.http.post(this.uri + '/employees/', newEmployee, { headers: this.headers });
  // .pipe(map(res => res));
  // }

  // deleteEmployee(id) {
  //   // implémentation de la route (repris de node js dans l'onglet route)
  //   return this.http.delete(this.uri + '/employees/${id}');
  //     // .pipe(map(res => res));
  // }
}
