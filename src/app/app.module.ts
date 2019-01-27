import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionComponent } from './transaction/transaction.component';
/*
Pour pouvoir utiliser le two-way binding,
il vous faut importer  FormsModule  depuis
@angular/forms  dans votre application.
*/
import { FormsModule } from '@angular/forms';
import { BarreMenuComponent } from './barre-menu/barre-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TransactionComponent,
    BarreMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatMenuModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
