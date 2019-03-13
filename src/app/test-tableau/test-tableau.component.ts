import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommercantService } from 'src/app/_services/commercant.service';
import { Subscription } from 'rxjs';
import { MCommercant } from 'src/app/_models/commercant.model';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from '../_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EmployeService } from '../_services/employe.service';

@Component({
  selector: 'app-test-tableau',
  templateUrl: './test-tableau.component.html',
  styleUrls: ['./test-tableau.component.scss']
})
export class TestTableauComponent implements OnInit, OnDestroy {
  commercants: MCommercant[];
  dataSource = new MatTableDataSource<MCommercant>(this.commercants);
  commercantSubscription: Subscription;
  displayColumns = ['name', 'tel', 'email', 'editer', 'supprimer'];

  identifiant: any;

  valeur = 0.0000001;
  valeurArc = valvaleurArc(this.valeur);
  // arcDelimiters est une valeur en % de la jauge
  canvasWidth = 600;
  needleValue = 20;
  centralLabel = '' + this.valeur;
  name = 'Solde Journalier';
  bottomLabel = '' + 50;
  options = {
    hasNeedle: false,
    needleColor: 'green',
    needleUpdateSpeed: 1000,
    arcColors: ['green', 'lightgray'],
    arcDelimiters: [1],
    needleStartValue: 1
  };


  constructor(
    private _commercantService: CommercantService,
    private _router: Router,
    private _authService: AuthService,
    private _jwtHelperService: JwtHelperService,
    private _employeService: EmployeService
  ) {
    const token = this._authService.getToken();
    // si token existe alors
    if (token) {
      // décoder le token et récupérer l'id de l'employe
      this.identifiant = this._jwtHelperService.decodeToken(token);
      // this.currentUser = this._employeService.getSolde(decodeToken.subject);
      // this.afficherTransactions(decodeToken.subject);
    }
  }

  ngOnInit() {
    console.log('initialisation', this.identifiant.subject);
    this._employeService
      .getSolde(this.identifiant.subject)
      .subscribe((solde: any) => {
        this.valeur = solde.soldeJour;
        console.log('solde du jour : ', this.valeur);
        // this.messageSolde += '' + solde.soldeTotal;
        console.log(solde);
        if (this.valeur >= 8) {
          this.options.arcColors = ['green', 'lightgray'];
        } else {
          if (this.valeur <= 5) {
            this.options.arcColors = ['red', 'lightgray'];
          } else {
            this.options.arcColors = ['orange', 'lightgray'];
          }
        }
        if (this.valeur < 0.01) {
          this.centralLabel = '0';
        }
        console.log('valeur :', this.valeur);
        this.options.arcDelimiters[0] = (this.valeur / 20.0000001) * 100;
        this.centralLabel = '' + this.valeur;
        this.valeurArc = valvaleurArc(this.valeur);
        console.log(this.valeurArc, this.valeur, this.options.arcDelimiters);
      });
  }

  afficherListeCommercants() {
    // initialisation de la méthode pour récupérer les employés
    this._commercantService.getListCommercant();
  }

  ajouterCommercant() {
    this._router.navigate(['/newCommercant']);
  }

  actionCommercant(event, id) {
    if (event === 'editer') {
      this._router.navigate(['/editCommercant', id]);
    } else {
      this._commercantService
        .deleteCommercant(id)
        .pipe(first())
        .subscribe(
          () => {
            this.afficherListeCommercants();
          },
          err => console.log('Erreur : ' + err)
        );
    }
  }
  ngOnDestroy() {
    this.commercantSubscription.unsubscribe();
  }
}

const valvaleurArc = valeur => {
  return (valeur / 20.0000001) * 100;
};
