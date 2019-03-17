// tslint:disable-next-line:class-name / initialement c'était class au lieu de interface
export class MTransaction {
  [x: string]: any;
  // _id: string;
  constructor(
    public formatDate: string,
    public montant: number,
    public commercant: string
  ) {}
}
