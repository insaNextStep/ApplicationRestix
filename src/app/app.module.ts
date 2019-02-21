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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { TransactionComponent } from './transaction/transaction.component';
import { JwtModule } from '@auth0/angular-jwt';
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
import { EmployeesComponent } from './companies/list-employees/employees.component';
import { CardsComponent } from './admin/cards/cards.component';
import { ChopsComponent } from './chops/chops.component';
import { CompaniesComponent } from './companies/companies.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './companies/add-employe/register.component';
import { LoginComponent } from './Authentification/login/login.component';
import { EmployeViewComponent } from './employees/employe-view/employe-view.component';

// service créer
import { EmployeeService } from './_services/employee.service';
import { CardService } from './_services/card.service';
import { CompanyService } from './_services/company.service';
import { TransactionService } from './_services/transaction.service';
import { ChopService } from './_services/chop.service';
import { AuthService } from './_services/auth.service';

// interceptor
// import { TokenInterceptor } from './_helpers/token.interceptor';
import { AdminComponent } from './admin/admin.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { AuthGuard } from './_guards/auth.guard';
// import { CanActivate } from '@angular/router/src/utils/preactivation';

export function getToken() {
  return localStorage.getItem('token');
}

// déclaration des routes:
const appRoutes: Routes = [
  {
    path: 'employeView',
    component: EmployeViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [AuthGuard],
    data: {allowedRoles: 'EMPLOYE'}
  },
  { path: 'cards', component: CardsComponent },
  {
    path: 'companies',
    component: CompaniesComponent,
    canActivate: [AuthGuard],
    data: {allowedRoles: 'ENTREPRISE'}
  },
  { path: 'chops', component: ChopsComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'accessdenied', component: AccessdeniedComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }
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
    LoginComponent,
    EmployeViewComponent,
    AdminComponent,
    AccessdeniedComponent
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
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: ['localhost:3000']
      }
    })
  ],
  providers: [
    // TokenInterceptor,
    AuthService,
    AuthGuard,
    EmployeeService,
    CardService,
    CompanyService,
    ChopService,
    TransactionService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
