import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommercantService } from 'src/app/_services/commercant.service';
import { Subscription } from 'rxjs';
import { MCommercant } from 'src/app/_models/commercant.model';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list-commercant',
  templateUrl: './list-commercant.component.html',
  styleUrls: ['./list-commercant.component.scss']
})
export class ListCommercantComponent implements OnInit, OnDestroy {
  commercants: MCommercant[];
  commercantSubscription: Subscription;
  displayColumns = ['name', 'phone', 'email', 'editer', 'supprimer'];
  constructor(
    private _commercantService: CommercantService,
    private _router: Router
  ) { }

  initList() {
    this.afficherListeCommercants();
    this.commercantSubscription = this._commercantService.commercantSubject.subscribe(
      (commercants: MCommercant[]) => {
        this.commercants = commercants;
      }
    );
    this._commercantService.emitCommercant();
  }

  ngOnInit() {
    this.initList();
  }

  afficherListeCommercants() {
    // initialisation de la méthode pour récupérer les employés
    this._commercantService.getListCommercant();
    console.log(this.commercantSubscription);
  }

  ajouterCommercant() {
    this._router.navigate(['/newCommercant']);
  }

  actionCommercant(event, id) {
    if (event === 'editer') {
      this._router.navigate(['/edit', id]);
    } else {
      this._commercantService
        .deleteCommercant(id)
        .pipe(first())
        .subscribe(
          () => {
            this.afficherListeCommercants();
            // this.initList();
          },
          err => console.log('Erreur : ' + err)
        );
    }
  }

  ngOnDestroy() {
    this.commercantSubscription.unsubscribe();
  }
}
