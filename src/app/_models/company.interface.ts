
// tslint:disable-next-line:class-name / initialement c'était class au lieu de interface
export interface ICompany {
  _id: string;
  name: string;
  phone: number;
  email: string;
  employees: object;
  creditCards: object;
  role: string;
  token?: string;
}
