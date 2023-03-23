import { Noeud } from "./Noeud";

export class Produit extends Noeud{
    
    constructor(ensemble1, ensemble2) {
        super("Produit")
        this.ensemble1 = ensemble1
        this.ensemble2 = ensemble2
    }

    estValide (){
        return this.ensemble1.estValide() && this.ensemble2.estValide() 
    }

    toJSON(){
        let objet = {}
        objet.type = this.type
        objet.ensemble1 = this.ensemble1.toJSON()
        objet.ensemble2 = this.ensemble2.toJSON()
        return JSON.stringify(objet)
    }
    
    toLatex(){
        let chaine = "( "+ this.ensemble1.toLatex() + " )\ \\times\ ( " + this.ensemble1.toLatex() + " )"
        return chaine
    }

}