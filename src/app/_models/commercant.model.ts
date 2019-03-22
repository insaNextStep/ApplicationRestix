// tslint:disable-next-line:class-name / initialement c'était class au lieu de interface
export class MCommercant {
  constructor(
    public nomCommercant: string,
    public tel: number,
    public email: string,
    public ibanCommercant: string,
    public siretCommercant: number,
    public tpe: number,
    public password?: string,
  ) {}
}
