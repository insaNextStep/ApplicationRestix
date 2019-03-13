// tslint:disable-next-line:class-name / initialement c'était class au lieu de interface
export class MEntreprise {
  // _id: string;
  constructor(
    public nomEntreprise: string,
    public tel: number,
    public email: string,
    public ibanEntreprise: string,
    public siretEntreprise: number,
  ) {}
}
