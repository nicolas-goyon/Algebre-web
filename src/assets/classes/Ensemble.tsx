import { Noeud } from "./Noeud.tsx";

export class Ensemble extends Noeud{
    nom : String;
    constructor(nom: String) {
        super("Ensemble")
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