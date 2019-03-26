import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Subscription } from 'rxjs';
import { EntrepriseService } from 'src/app/_services/entreprise.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { IEntreprise } from 'src/app/_models/entreprise.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CommercantService } from 'src/app/_services/commercant.service';

@Component({
  selector: 'app-mes-ventes',
  templateUrl: './mes-ventes.component.html',
  styleUrls: ['./mes-ventes.component.scss'],
  providers: [AuthService]
})
export class MesVentesComponent implements OnInit {
  // initialisation d'un tableau d'employés vide :
  liste: any;
  // listeVentes: IVentes[];
  listeEntreprise: IEntreprise[];
  // listeVentess = new MatTableDataSource<IEntreprise>(this.liste);
  CommercantSubscription: Subscription;
  displayColumns = ['refTransaction', 'formatDate', 'montant'];
  actuelEmploye: any = '';
  transactions: any;
  transactionsSubscription: Subscription;
  tableau = [];
  utilisateur = '';
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _entrepriseService: EntrepriseService,
    private _router: Router,
    private _authService: AuthService,
    private _jwtHelperService: JwtHelperService,
    private _commercantService: CommercantService
  ) {

  }

  afficherListeVentes(id: string) {
    // initialisation de la méthode pour récupérer les employés
    this._commercantService.getMesVentes(id).subscribe(
      (res: any) => {
        this.transactions = res;
        this.transactions.sort((a, b) => b.date.localeCompare(a.date));
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          // console.log('erreur :' + err);
          if (err.status === 401) {
            this._router.navigate(['login']);
          }
        }
      }
    );
  }

  private idCommercant() {
    const userValue = this._authService.currentUserValue;
    // console.log('userValue');
    // console.log(userValue);
    // décoder le token et récupérer l'id de l'employe
    const decodeToken = this._jwtHelperService.decodeToken(userValue.token);
    this.utilisateur = decodeToken.nomCommercant;
    // console.log('decodeToken', decodeToken);
    return decodeToken.subject;
  }

  ngOnInit() {

    // console.log('employeId : ' + decodeToken.subject);
    this.afficherListeVentes(this.idCommercant());
    // this.listeEmployes.paginator = this.paginator;
    // this.afficherListeEmployes();
  }
}
