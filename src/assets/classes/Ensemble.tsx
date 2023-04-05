import { Noeud } from "./Noeud.tsx";
import { NoeudsBase } from "./Noeuds.tsx";
export class Ensemble extends Noeud{
    nom : String;
    constructor(nom: String, index: number) {
        super(NoeudsBase.Ensemble, index)
        this.nom = nom
    }

    estValide (): Boolean{
        return true 
    }

    toJSON(): string{
        let objet = {  
            type: this.type,
            nom: this.nom,
        }
        return JSON.stringify(objet)
    }

    toLatex():String{
        let chaine = this.nom
        return chaine
    }

    copy(): Noeud{
        return new Ensemble(this.nom, this.index)
    }


}