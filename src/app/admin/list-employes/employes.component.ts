import { Component, OnInit, ViewChild } from '@angular/core';

// ajout du modèle de la base de données à utilisé pour la liste des employés
import { IEmploye } from '../../_models/employe.interface';
// importation du service de gestion des employés
import { EmployeService } from '../../_services/employe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-liste-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.scss']
})
export class EmployesComponent implements OnInit {
  // initialisation d'un tableau d'employés vide :
  liste: IEmploye[];
  listeEmployes = new MatTableDataSource<IEmploye>(this.liste);
  employeSubscription: Subscription;
  displayColumns = [
    'id',
    'nom',
    'tel',
    'email',
    'restix',
    'entreprise',
    'soldeJ',
    'soldeT',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private employeService: EmployeService, private _router: Router) {
    this.afficherListeEmployes();
  }

  afficherListeEmployes() {
    // initialisation de la méthode pour récupérer les employés
    this.employeService.getListEmployes().subscribe(
      res => (this.liste = res),
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

  ajouterEmployer() {
    this._router.navigate(['newEmploye']);
  }

  actionEmploye(event: string, id: string) {
    if (event === 'éditer') {
      this._router.navigate(['/editEmploye', id]);
    } else {
      this.employeService
        .DissocierEmploye(id)
        .pipe(first())
        .subscribe(
          () => {
            this.afficherListeEmployes();
          },
          // err => console.log('Erreur : ' + err)
        );
    }
  }

  ngOnInit() {
    this.listeEmployes.paginator = this.paginator;
    this.afficherListeEmployes();
  }
}
