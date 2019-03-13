
// tslint:disable-next-line:class-name / initialement c'était class au lieu de interface
export interface IEmploye {
  _id: string;
  tel: string;
  email: string;
  entreprise: string;
  restix: string;
  password: string;
  nom: string;
  prenom: string;
  soldeJour: number;
  soldeTotal: number;
  role: string;
  token?: string;
  transactions?: [];
}
