
// tslint:disable-next-line:class-name / initialement c'était class au lieu de interface
export interface card {
  _id: string;
  number: number;
  status: string;
  company: object;
  companyId: string;
  employee: object;
  employeeId: string;
  url: string;
}
