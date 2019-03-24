import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LayoutModule} from '@angular/cdk/layout';
// MDB Angular Free
import { WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatTableModule,
  MatToolbarModule,
  MatInputModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatSortModule, MatSidenavModule, MatIconModule, MatListModule
} from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxMaskModule } from 'ngx-mask';
import { UserIdleModule } from 'angular-user-idle';
// import { GaugeChartComponent } from 'angular-gauge-chart';
/*
Pour pouvoir utiliser le two-way binding,
il vous faut importer  FormsModule  depuis
@angular/forms  dans votre application.
*/
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarreMenuComponent } from './barre-menu/barre-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularResizedEventModule } from 'angular-resize-event';
// import { from } from 'rxjs';

// component créer
import { AppComponent } from './app.component';
import { EmployesComponent } from './admin/list-employes/employes.component';
import { CardsComponent } from './admin/cards/cards.component';
import { HomeComponent } from './home/home.component';
import { NewEmployeComponent } from './entreprise/add-employe/new-employe.component';
import { LoginComponent } from './Authentification/login/login.component';
import { NewEntrepriseComponent } from './Authentification/register/new-entreprise/new-entreprise.component';
import { LoginEntrepriseComponent } from './Authentification/login/login-entreprise/login-entreprise.component';
import { LoginEmployeComponent } from './Authentification/login/login-employe/login-employe.component';
import { EditEmployeComponent } from './employe/edit-employe/edit-employe.component';
import { ActiveCompteComponent } from './employe/active-compte/active-compte.component';
import { NewCommercantComponent } from './Authentification/register/new-commercant/new-commercant.component';
import { ListCommercantComponent } from './admin/list-commercant/list-commercant.component';
import { CompaniesComponent } from './admin/list-entreprises/companies.component';
import { MesEmployesComponent } from './entreprise/mes-employes/mes-employes.component';
import { LogincommercantComponent } from './Authentification/login/login-commercant/login-commercant.component';

// service créer
import { EmployeService } from './_services/employe.service';
import { CardService } from './_services/card.service';
import { TransactionService } from './_services/transaction.service';
import { CommercantService } from './_services/commercant.service';
import { AuthService } from './_services/auth.service';
import { EntrepriseService } from './_services/entreprise.service';

// interceptor
// import { TokenInterceptor } from './_helpers/token.interceptor';
import { AdminComponent } from './admin/admin.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { AuthGuard } from './_guards/auth.guard';
import { AlertComponent } from './_directives/alert.component';
import { AlertService } from './_services/alert.service';
import { MesVentesComponent } from './commercant/mes-ventes/mes-ventes.component';
import { EditEntrepriseComponent } from './entreprise/edit-entreprise/edit-entreprise.component';
import { EditCommercantComponent } from './commercant/edit-commercant/edit-commercant.component';


// import { CanActivate } from '@angular/router/src/utils/preactivation';

export function getToken() {
  return localStorage.getItem('token');
}

// const serverBackEnd = 'localhost:3000';
const serverBackEnd = 'https://restix.herokuapp.com';

// déclaration des routes:
const appRoutes: Routes = [
  {
    path: 'ActiveCompte',
    component: ActiveCompteComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: 'EMPLOYE' }
  },
  {
    path: 'mesEmployes',
    component: MesEmployesComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: 'ENTREPRISE' }
  },
  {
    path: 'newEmploye',
    component: NewEmployeComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: 'ENTREPRISE' }
  },
  {
    path: 'editEmploye/:id',
    component: EditEmployeComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['ENTREPRISE', 'EMPLOYE', 'ADMIN'] }
  },
  {
    path: 'editEntreprise/:id',
    component: EditEntrepriseComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['ENTREPRISE', 'ADMIN'] }
  },
  {
    path: 'listEntreprises',
    component: CompaniesComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: 'ADMIN' }
  },
  {
    path: 'listEmployes',
    component: EmployesComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: 'ADMIN' }
  },
  {
    path: 'listCommercants',
    component: ListCommercantComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: 'ADMIN' }
  },
  {
    path: 'editCommercant/:id',
    component: EditCommercantComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['COMMERCANT', 'ADMIN'] }
  },
  {
    path: 'mesVentes',
    component: MesVentesComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['COMMERCANT', 'ADMIN'] }
  },
  { path: 'newEntreprise', component: NewEntrepriseComponent },
  { path: 'newCommercant', component: NewCommercantComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login/entreprise', component: LoginEntrepriseComponent },
  { path: 'login/employe', component: LoginEmployeComponent },
  { path: 'login/commercant', component: LogincommercantComponent },
  { path: 'accessdenied', component: AccessdeniedComponent },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BarreMenuComponent,
    EmployesComponent,
    CardsComponent,
    CompaniesComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    AccessdeniedComponent,
    NewEntrepriseComponent,
    NewEmployeComponent,
    LoginEntrepriseComponent,
    LoginEmployeComponent,
    EditEmployeComponent,
    ActiveCompteComponent,
    NewCommercantComponent,
    ListCommercantComponent,
    MesEmployesComponent,
    LogincommercantComponent,
    AlertComponent,
    MesVentesComponent,
    EditEntrepriseComponent,
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
    MatPaginatorModule,
    MatFormFieldModule,
    LayoutModule,
    MatSortModule,
    AppRoutingModule,
    WavesModule,
    ButtonsModule,
    BrowserAnimationsModule,
    AngularResizedEventModule,
    HttpClientModule,
    NgxMaskModule,
    ReactiveFormsModule,
    UserIdleModule.forRoot({ idle: 600, timeout: 300, ping: 120 }),
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: [serverBackEnd]
      }
    }),
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    // TokenInterceptor,
    AuthService,
    AlertService,
    AuthGuard,
    EmployeService,
    CardService,
    EntrepriseService,
    TransactionService,
    CommercantService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
