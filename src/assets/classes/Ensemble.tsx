import { Noeud } from "./Noeud.tsx";
import { NoeudsBase } from "./Noeuds.tsx";
export class Ensemble extends Noeud{
    nom : String;
    constructor(nom: String) {
        super(NoeudsBase.Ensemble)
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

}