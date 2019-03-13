
// tslint:disable-next-line:class-name / initialement c'était class au lieu de interface
export interface ITransaction {
  _id: string;
  formatDate: string;
  commercant: string;
  montant: number;
}
