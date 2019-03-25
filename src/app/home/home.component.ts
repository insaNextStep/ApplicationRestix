import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SafeStyle } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  // parallaxImage = '../../assets/imgs/background-photo.jpg';
  backgroundImage = '/assets/imgs/background-photo.jpg';
  colorFlag: string;
  isBackgroundRed: string;

  get backgroundImageUrl() {
    if (this.backgroundImage) {
      return `url("${this.backgroundImage}")`;
    }

    return null;
  }

  getMyStyles() {
    const myStyles = {
      'background-image': !this.isBackgroundRed
        ? 'url(\'../assets/imgs/background-photo.jpg\')'
        : 'url(\'../assets/imgs/background-photo.jpg\')',
      color: this.colorFlag ? 'black' : 'yellow'
    };
    return myStyles;
  }

  // routerLink="/login/employe" routerLinkActive="active"
  async checkConnect(item) {
    if (this._authService.loggedIn()) {
      switch (item) {
        case 'EMPLOYE':
          // console.log('employe', item);
          if (item === this._authService.getRole()) {
            this._router.navigate(['/ActiveCompte']);
          } else {
            this._router.navigate(['/']);
          }
          break;

        case 'ENTREPRISE':
          // console.log('entreprise', item);
          if (item === this._authService.getRole()) {
            this._router.navigate(['/mesEmployes']);
          } else {
            this._router.navigate(['/']);
          }
          break;

        case 'COMMERCANT':
          // console.log('commercant', item);
          if (item === this._authService.getRole()) {
            this._router.navigate(['/mesVentes']);
          } else {
            this._router.navigate(['/']);
          }
          break;

        default:
          this._router.navigate(['/']);
          break;
      }
    } else {
      switch (item) {
        case 'EMPLOYE':
          // console.log('non employe', item);
          this._router.navigate(['/login/employe']);
          break;

        case 'ENTREPRISE':
          // console.log('non entreprise', item);
          this._router.navigate(['/login/entreprise']);
          break;

        case 'COMMERCANT':
          // console.log('non entreprise', item);
          this._router.navigate(['/login/commercant']);
          break;

        default:
          this._router.navigate(['/']);
          break;
      }
    }
    // const role = this._authService.getRole();
    // console.log('item:', item, 'role', role, 'auth', auth);
  }

  ngOnInit(): void {
    this.backgroundImage = this._route.snapshot.data['background'];
  }
}
