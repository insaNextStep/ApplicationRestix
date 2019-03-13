
// tslint:disable-next-line:class-name / initialement c'était class au lieu de interface
export interface IEntreprise {
  _id: string;
  nomEntreprise: string;
  tel: number;
  email: string;
  employes: object;
  creditCards: object;
  ibanEntreprise: string;
  numEntreprise: number;
  siretEntreprise: number;
  role: string;
  token?: string;
}
