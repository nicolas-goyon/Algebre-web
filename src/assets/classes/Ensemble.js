import { Noeud } from "./Noeud";

export class Intersection extends Noeud{
    
    constructor(nom) {
        super("Ensemble")
        this.nom = nom
    }

    estValide (){
        return true 
    }

    toJSON(){
        let objet = {}
        objet.type = this.type
        objet.nom = nom 
        return JSON.stringify(objet)
    }

    toLatex(){
        let chaine = this.nom
        return chaine
    }

}