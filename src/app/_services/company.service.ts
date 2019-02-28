import { Injectable } from '@angular/core';
// importer les fonctionnalité de HTTP pour travailler avec les méthode réposne/header
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private uri = 'http://localhost:3000/companies';
  // création d'un instance avec http
  constructor(private http: HttpClient) {}

  getListeCompanies() {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this.http.get(this.uri + '/');
  }

  getCompany(id) {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this.http.get(`${this.uri}/${id}`);
  }

  getCompanyName(id) {
    console.log(`getCompanyName(${id})`);
    return this.http.get(`${this.uri}/name/${id}`);
  }
}
