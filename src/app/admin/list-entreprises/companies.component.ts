import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MEntreprise } from 'src/app/_models/entreprise.model';
import { EntrepriseService } from 'src/app/_services/entreprise.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  providers: [EntrepriseService]
})
export class CompaniesComponent implements OnInit, OnDestroy {

  entreprises: MEntreprise[];
  entrepriseSubscription: Subscription;
  displayColumns = ['name', 'tel', 'email', 'employes', 'editer', 'supprimer'];

  constructor(
    private _EntrepriseService: EntrepriseService,
    private _router: Router
  ) {
    this.afficherListeEntreprise();

  }

  initList() {
    // console.log('initialisation affichage');
    this.entrepriseSubscription = this._EntrepriseService.entrepriseSubject.subscribe(
      (entreprises: any) => {
        // console.log('resultat affichage');
        this.entreprises = entreprises;
      }
    );
    this._EntrepriseService.emitEntreprise();
  }

  ngOnInit() {
    this.initList();
  }

  afficherListeEntreprise() {
    // initialisation de la méthode pour récupérer les employés
    this._EntrepriseService.getListeEntreprises();
  }

  ajouterEntreprise() {
    this._router.navigate(['/newEntreprise']);
  }

  actionEntreprise(event, id) {
    if (event === 'editer') {
      this._router.navigate(['/editEntreprise', id]);
    } else {
      this._EntrepriseService
        .deleteEntreprise(id)
        .pipe(first())
        .subscribe(
          () => {
            this.afficherListeEntreprise();
            // this.initList();
          },
          // err => console.log('Erreur : ' + err)
        );
    }
  }

  ngOnDestroy() {
    this.entrepriseSubscription.unsubscribe();
  }
}
