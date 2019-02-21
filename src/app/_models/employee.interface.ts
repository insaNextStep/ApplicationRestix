
// tslint:disable-next-line:class-name / initialement c'était class au lieu de interface
export interface IEmployee {
  _id: string;
  phone: string;
  email: string;
  company: string;
  creditCard: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  token?: string;
}
