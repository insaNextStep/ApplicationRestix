
// tslint:disable-next-line:class-name / initialement c'était class au lieu de interface
export interface ITransaction {
  _id: string;
  date: Date;
  TPE: string;
  creditCard: string;
}
