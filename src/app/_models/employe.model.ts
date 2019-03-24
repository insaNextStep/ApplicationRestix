
// tslint:disable-next-line:class-name / initialement c'était class au lieu de interface
export class MEmploye {
    constructor(
        public nom: string,
        public prenom: string,
        public tel: string,
        public email: string,
        public entreprise?: string
        ) {}
}
