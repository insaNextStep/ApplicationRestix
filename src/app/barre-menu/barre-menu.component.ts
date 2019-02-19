import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-barre-menu',
  templateUrl: './barre-menu.component.html',
  styleUrls: ['./barre-menu.component.scss']
})
export class BarreMenuComponent implements OnInit {
  constructor(private _auth: AuthService) {}

  ngOnInit() {}
}

export class AppBarreMenu {}
