
// tslint:disable-next-line:class-name / initialement c'était class au lieu de interface
export class Employe {
  constructor(
    public name: string,
    public phone: string,
    public email: string,
    public company: string,
    public card: string) { }
}

// protype pour un modèle :
// explort class nomModele{
//   public item1: string,
//   ...
//   public item2: string) { }
// }

