
// tslint:disable-next-line:class-name / initialement c'était class au lieu de interface
export class MEmployee {
    constructor(
        public firstName: string,
        public lastName: string,
        public eMail: string,
        public numberStreet: number,
        public street: string,
        public codePostal: number,
        public city: string,
        public solde: number,
        public dailyUse: number,
        public phone: number,
        public email: string,
        public activate: boolean,
        public role: string,
        public token?: string) {
  }
}
