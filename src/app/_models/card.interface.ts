
// tslint:disable-next-line:class-name / initialement c'était class au lieu de interface
export interface ICard {
  _id: string;
  number: number;
  status: string;
  entrerpise: object;
  entrerpiseId: string;
  employe: object;
  employeId: string;
  url: string;
}
