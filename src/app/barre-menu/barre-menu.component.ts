import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router, ResolveEnd, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-barre-menu',
  templateUrl: './barre-menu.component.html',
  styleUrls: ['./barre-menu.component.scss']
})
export class BarreMenuComponent implements OnInit {
  menuEmploye = false;
  menuEntreprise = false;
  menuCommercant = false;
  menuActif = false;
  actuelUtilisateur = '';
  constructor(
    public _authService: AuthService,
    private _router: Router,
    private _jwtHelperService: JwtHelperService
  ) {
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('currentUserValue', this.idUtilisateur());
        const role = this._authService.getRole()
          ? this._authService.getRole()
          : '';

        console.log(event.url, role);
        switch (role) {
          case 'EMPLOYE':
            if (event.url === '/ActiveCompte' && this._authService.loggedIn()) {
              this.menuEmploye = true;
              this.menuCommercant = false;
              this.menuEntreprise = false;
              this.menuActif = true;
            }
            break;
          case 'COMMERCANT':
            if (event.url === '/mesVentes' && this._authService.loggedIn()) {
              this.menuEmploye = false;
              this.menuCommercant = true;
              this.menuEntreprise = false;
              this.menuActif = true;
            }
            break;
          case 'ADMIN':
            break;
          case 'ENTREPRISE':
            if (event.url === '/mesEmployes' && this._authService.loggedIn()) {
              this.menuEmploye = false;
              this.menuCommercant = false;
              this.menuEntreprise = true;
              this.menuActif = true;
            }
            break;
          default:
            console.log('aucun menu');
            this.menuActif = false;
            this.menuEmploye = false;
            this.menuCommercant = false;
            this.menuEntreprise = false;
            break;
        }
      });
  }

  idUtilisateur() {
    // recupération du token
    const token = this._authService.getToken();
    console.log('token : ' + token);
    // si token existe alors
    if (token) {
      // décoder le token et récupérer l'id de l'employe
      const decodeToken = this._jwtHelperService.decodeToken(token);
      this.actuelUtilisateur = decodeToken.subject;
    } else {
      this.actuelUtilisateur = '';
    }
  }

  ajouterEmployer() {
    this._router.navigate(['newEmploye']);
  }

  editProfil(id) {
    const role = this._authService.getRole() ? this._authService.getRole() : '';
    console.log('id', id);

    switch (role) {
      case 'EMPLOYE':
        this._router.navigate(['/editEmploye', id]);
        break;
      case 'ENTREPRISE':
        this._router.navigate(['/editEmploye', id]);
        break;
      case 'COMMERCANT':
        this._router.navigate(['/editEmploye', id]);
        break;
      default:
        break;
    }
  }

  ngOnInit() {}
}

export class AppBarreMenu {}
