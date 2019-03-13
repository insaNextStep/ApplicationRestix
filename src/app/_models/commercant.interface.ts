// tslint:disable-next-line:class-name / initialement c'était class au lieu de interface
export interface ICommercant {
  nomCommercant: string;
  tel: number;
  email: string;
  ibanCommercant: string;
  siretCommercant: number;
  password: string;
  codecommercant: number;
  tpe: number;
  role: string;
  token?: string;
}

