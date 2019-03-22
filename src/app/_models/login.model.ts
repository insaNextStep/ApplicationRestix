// tslint:disable-next-line:class-name / initialement c'était class au lieu de interface
export class MLogin {
  constructor(
    public email: string,
    public password?: string,
  ) {}
}
