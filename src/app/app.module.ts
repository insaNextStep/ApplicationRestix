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
import { UserIdleModule } from 'angular-user-idle';
/*
Pour pouvoir utiliser le two-way binding,
il vous faut importer  FormsModule  depuis
@angular/forms  dans votre application.
*/
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarreMenuComponent } from './barre-menu/barre-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { from } from 'rxjs';

// component créer
import { AppComponent } from './app.component';
import { EmployeesComponent } from './companies/list-employees/employees.component';
import { CardsComponent } from './admin/cards/cards.component';
import { CompaniesComponent } from './companies/companies.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './companies/add-employe/register.component';
import { LoginComponent } from './Authentification/login/login.component';
import { NewEntrepriseComponent } from './Authentification/register/new-entreprise/new-entreprise.component';
import { LoginEntrepriseComponent } from './Authentification/login/login-entreprise/login-entreprise.component';
import { LoginEmployeComponent } from './Authentification/login/login-employe/login-employe.component';
import { VueTransactionComponent } from './employe/vue-transaction/vue-transaction.component';
import { EditProfileComponent } from './employe/edit-profile/edit-profile.component';
import { ActiveCompteComponent } from './employe/active-compte/active-compte.component';

// service créer
import { EmployeeService } from './_services/employee.service';
import { CardService } from './_services/card.service';
import { CompanyService } from './_services/company.service';
import { TransactionService } from './_services/transaction.service';
import { CommercantService } from './_services/commercant.service';
import { AuthService } from './_services/auth.service';

// interceptor
// import { TokenInterceptor } from './_helpers/token.interceptor';
import { AdminComponent } from './admin/admin.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { AuthGuard } from './_guards/auth.guard';
import { NewCommercantComponent } from './Authentification/register/new-commercant/new-commercant.component';
import { ListCommercantComponent } from './admin/list-commercant/list-commercant.component';
import { EditCommercantComponent } from './admin/edit-commercant/edit-commercant.component';

// import { CanActivate } from '@angular/router/src/utils/preactivation';

export function getToken() {
  return localStorage.getItem('token');
}

// déclaration des routes:
const appRoutes: Routes = [

  {
    path: 'employees',
    component: EmployeesComponent,
    // canActivate: [AuthGuard],
    // data: { allowedRoles: 'ENTREPRISE' }
  },
  {
    path: 'cards',
    component: CardsComponent,
    // canActivate: [AuthGuard],
    // data: { allowedRoles: 'ADMIN' }
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    // canActivate: [AuthGuard],
    // data: { allowedRoles: 'ADMIN' }
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    // canActivate: [AuthGuard],
    // data: { allowedRoles: 'ADMIN' }
  },
  {
    path: 'listCommercant',
    component: ListCommercantComponent,
    // canActivate: [AuthGuard],
    // data: { allowedRoles: 'ADMIN' }
  },
  { path: 'newEntreprise', component: NewEntrepriseComponent },
  { path: 'newCommercant', component: NewCommercantComponent },
  { path: 'edit/:id', component: NewCommercantComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'accessdenied', component: AccessdeniedComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    TransactionComponent,
    BarreMenuComponent,
    EmployeesComponent,
    CardsComponent,
    TransactionsComponent,
    CompaniesComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    AccessdeniedComponent,
    NewEntrepriseComponent,
    LoginEntrepriseComponent,
    LoginEmployeComponent,
    VueTransactionComponent,
    EditProfileComponent,
    ActiveCompteComponent,
    NewCommercantComponent,
    ListCommercantComponent,
    EditCommercantComponent
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
    ReactiveFormsModule,
    UserIdleModule.forRoot({ idle: 600, timeout: 300, ping: 120 }),
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
    TransactionService,
    CommercantService,
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
