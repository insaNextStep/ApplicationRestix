import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatTableModule,
  MatToolbarModule,
  MatInputModule
} from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { TransactionComponent } from './transaction/transaction.component';
import { NgxMaskModule } from 'ngx-mask';
/*
Pour pouvoir utiliser le two-way binding,
il vous faut importer  FormsModule  depuis
@angular/forms  dans votre application.
*/
import { FormsModule } from '@angular/forms';
import { BarreMenuComponent } from './barre-menu/barre-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { from } from 'rxjs';

// component créer
import { AppComponent } from './app.component';
import { EmployeesComponent } from './list-employees/employees.component';
import { CardsComponent } from './list-cards/cards.component';
import { ChopsComponent } from './list-chops/chops.component';
import { CompaniesComponent } from './list-companies/companies.component';
import { TransactionsComponent } from './list-transactions/transactions.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

// service créer
import { EmployeeService } from './services/liste-employee.service';
import { CardService } from './services/liste-card.service';
import { CompanyService } from './services/liste-company.service';
import { TransactionService } from './services/liste-transaction.service';
import { ChopService } from './services/liste-chop.service';
import { AuthService } from './services/auth.service';

// déclaration des routes:
const appRoutes: Routes = [
  { path: 'list-employees', component: EmployeesComponent },
  { path: 'list-cards', component: CardsComponent },
  { path: 'list-companies', component: CompaniesComponent },
  { path: 'list-chops', component: ChopsComponent },
  { path: 'list-transactions', component: TransactionsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    TransactionComponent,
    BarreMenuComponent,
    EmployeesComponent,
    CardsComponent,
    TransactionsComponent,
    ChopsComponent,
    CompaniesComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxMaskModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [AuthService, EmployeeService, CardService, CompanyService, ChopService, TransactionService],
  bootstrap: [AppComponent]
})
export class AppModule {}
