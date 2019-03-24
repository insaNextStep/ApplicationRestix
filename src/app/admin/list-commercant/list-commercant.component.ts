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
  displayColumns = ['name', 'tel', 'email', 'editer', 'supprimer'];

  constructor(
    private _commercantService: CommercantService,
    private _router: Router
  ) {
    this.afficherListeCommercants();
  }

  initList() {
    this.commercantSubscription = this._commercantService.commercantSubject.subscribe(
      (commercants: MCommercant[]) => {
        this.commercants = commercants;
        // console.log(commercants);
      }
    );
    this._commercantService.emitCommercant();
  }

  ngOnInit() {
    this.initList();
  }

  afficherListeCommercants() {
    // console.log('\n\n ********************* afficher liste des commercant ********************* \n');
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
          // err => console.log('Erreur : ' + err)
        );
    }
  }
  ngOnDestroy() {
    this.commercantSubscription.unsubscribe();
  }
}
