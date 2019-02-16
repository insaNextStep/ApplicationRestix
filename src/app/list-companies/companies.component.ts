import { Component, OnInit, Input } from '@angular/core';
// ajout du modèle de la base de données à utilisé pour la liste des employés
import { company } from '../schemas/schemaCompany';
// importation du service de gestion des employés
import { CompanyService } from '../services/liste-company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  providers: [CompanyService]
})
export class CompaniesComponent implements OnInit {
  // initialisation d'un tableau d'employés vide :
  listeCompanies: company[];
  uneEntreprise: company;
  displayColumns = [
    'name', 'phone', 'email', 'employees', 'creditCards'
  ];
  constructor(private companyService: CompanyService) { }

  getCompanies() {
    // initialisation de la méthode pour récupérer les employés
    this.companyService.getListeCompanies().subscribe(companies => {
      this.listeCompanies = companies as Array<company>;
    });
  }

  ngOnInit() {
    this.getCompanies();
  }
}
