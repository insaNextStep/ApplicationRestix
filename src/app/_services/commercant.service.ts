import { Injectable } from '@angular/core';
import { MCommercant } from '../_models/commercant.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommercantService {
  //  initialisation de chops avec le modèle MCommercant
  private commercants: MCommercant[] = [];
  commercantSubject = new Subject<MCommercant[]>();

  constructor(private _httpClient: HttpClient) {}

  // private uri = 'http://localhost:3000/commercants';
  private uri = 'https://restix.herokuapp.com/commercants';

  emitCommercant() {
    this.commercantSubject.next(this.commercants.slice());
  }

  getListCommercant() {
    // implémentation de la route (repris de node js dans l'onglet route)
    this._httpClient.get<any[]>(`${this.uri}/list/`).subscribe(
      res => {
        this.commercants = res;
        this.emitCommercant();
        // console.log(this.commercants);
      },
      err => console.log('Erreur : ' + err)
    );
  }

  getCommercant(id: string): Observable<MCommercant[]> {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this._httpClient
      .get<MCommercant[]>(`${this.uri}/${id}`)
      .pipe(map(res => res));
  }

  addCommercant(commercant: MCommercant) {
    return this._httpClient
      .post(`${this.uri}/add/`, commercant)
      .subscribe(
        (res: any) => {
          console.log('Enregistrement terminé');
          this.commercants.push(res);
          this.emitCommercant();
        },
        err => console.log('Erreur : ' + err)
      );
  }

  updateCommercant(commercant, id) {
    console.log(commercant);
    return this._httpClient
      .patch(`${this.uri}/update/${id}`, commercant)
      .pipe(map(res => res));
  }


  deleteCommercant(id: string) {
    return this._httpClient.delete(`${this.uri}/delete/${id}`).pipe(map(res => res));
  }

  emailExist(email: string): Observable<MCommercant[]> {
    return this._httpClient.get<MCommercant[]>(`${this.uri}/email/${email}`).pipe(map(res => res));
  }
}
