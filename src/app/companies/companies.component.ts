import { Component, OnInit, Input } from '@angular/core';
// ajout du modèle de la base de données à utilisé pour la liste des employés
import { ICompany } from '../_models/company.interface';
// importation du service de gestion des employés
import { CompanyService } from '../_services/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  providers: [CompanyService]
})
export class CompaniesComponent implements OnInit {
  // initialisation d'un tableau d'employés vide :
  listeCompanies: ICompany[];
  uneEntreprise: ICompany;
  displayColumns = [
    'name', 'phone', 'email', 'employees', 'creditCards'
  ];
  constructor(private companyService: CompanyService) { }

  getCompanies() {
    // initialisation de la méthode pour récupérer les employés
    this.companyService.getListeCompanies().subscribe(companies => {
      this.listeCompanies = companies as Array<ICompany>;
    });
  }

  ngOnInit() {
    this.getCompanies();
  }
}
