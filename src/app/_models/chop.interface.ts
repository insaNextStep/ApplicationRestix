
// tslint:disable-next-line:class-name / initialement c'était class au lieu de interface
export interface IChop {
  _id: string;
  name: string;
  phone: number;
  email: string;
  company: string;
  creditCard: string;
  role: string;
  token?: string;
}
