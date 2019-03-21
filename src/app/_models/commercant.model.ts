// tslint:disable-next-line:class-name / initialement c'était class au lieu de interface
export class MCommercant {
  constructor(
    public nomCommercant: string,
    public tel: string,
    public email: string,
    public ibanCommercant: string,
    public siretCommercant: string,
    public tpe: string,
  ) {}
}
