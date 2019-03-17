import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { MEntreprise } from 'src/app/_models/entreprise.model';
import { Subscription } from 'rxjs';
import { EntrepriseService } from 'src/app/_services/entreprise.service';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeService } from 'src/app/_services/employe.service';
import { Router } from '@angular/router';
import { IEmploye } from 'src/app/_models/employe.interface';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { IEntreprise } from 'src/app/_models/entreprise.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-mes-employes',
  templateUrl: './mes-employes.component.html',
  styleUrls: ['./mes-employes.component.scss'],
  providers: [AuthService]
})
export class MesEmployesComponent implements OnInit {
  // initialisation d'un tableau d'employés vide :
  // liste: any;
  listeEmployes: IEmploye[];
  // listeEntreprise: IEntreprise[];
  // listeEmployes = new MatTableDataSource<IEntreprise>();
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // EntrepriseSubscription: Subscription;
  displayColumns = [ 'nom', 'tel', 'email', 'restix'];

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _entrepriseService: EntrepriseService,
    private _router: Router,
    private _authService: AuthService,
    private _jwtHelperService: JwtHelperService,
    private _employeService: EmployeService
  ) {}

  afficherListeEmployes(id: string) {
    // initialisation de la méthode pour récupérer les employés
    this._entrepriseService.getMesEmployes(id).subscribe(
      (res: any) => {
        this.listeEmployes = res.employes;
        console.log('\n\n\npaginator');
        // console.log(this.paginator);
        console.log(this.listeEmployes);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          console.log('erreur :' + err);
          if (err.status === 401) {
            this._router.navigate(['login']);
          }
        }
      }
    );
  }

  actionEmploye(event: string, id: string) {
    if (event === 'éditer') {
      this._router.navigate(['/editEmploye', id]);
    } else {
      this._employeService
        .DissocierEmploye(id)
        .pipe(first())
        .subscribe(
          () => {
            this.afficherListeEmployes(this.idEntreprise());
          },
          err => console.log('Erreur : ' + err)
        );
    }
  }

  private idEntreprise() {
    const userValue = this._authService.currentUserValue;
    console.log('userValue');
    console.log(userValue);
    // décoder le token et récupérer l'id de l'employe
    const decodeToken = this._jwtHelperService.decodeToken(userValue.token);
    return decodeToken.subject;
  }

  ngOnInit() {
    // this.listeEmployes.paginator = this.paginator;
    // console.log('employeId : ' + decodeToken.subject);
    this.afficherListeEmployes(this.idEntreprise());
    // this.afficherListeEmployes();
  }

  ajouterEmployer() {
    this._router.navigate(['newEmploye']);
  }
}
