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
  actuelUtilisateur = '';
  constructor(public _authService: AuthService, private _router: Router, private _jwtHelperService: JwtHelperService) {
    _router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('currentUserValue', this.idUtilisateur());
        const role = this._authService.getRole();
        console.log(event.url, role);
        switch (role) {
          case 'EMPLOYE':
            if (event.url === '/ActiveCompte') {
              this.menuEmploye = true;
              this.menuCommercant = false;
              this.menuEntreprise = false;
            }
            break;
          case 'COMMERCANT':
            if (event.url === '/mesVentes') {
              this.menuEmploye = false;
              this.menuCommercant = true;
              this.menuEntreprise = false;
            }
            break;
          case 'ADMIN':
            break;
          case 'ENTREPRISE':
            if (event.url === '/mesEmployes') {
              this.menuEmploye = false;
              this.menuCommercant = false;
              this.menuEntreprise = true;
            }
            break;
          default:
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

  editProfil(id) {
    console.log('id', id);
    this._router.navigate(['/editEmploye', id]);
  }

  ngOnInit() {
  }
}

export class AppBarreMenu {}
