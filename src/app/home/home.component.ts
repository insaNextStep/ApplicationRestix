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
  backgroundImage = '../assets/imgs/background-photo.jpg';

  get backgroundImageUrl() {
    if (this.backgroundImage) {
      return `url("${this.backgroundImage}")`;
    }

    return null;
  }

  ngOnInit(): void {
    // this.backgroundImage = this._route.snapshot.data['background'];
  }
}
