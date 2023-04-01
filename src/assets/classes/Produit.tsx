import { Noeud } from "./Noeud.tsx";

export class Produit extends Noeud{
    ensemble1: Noeud;
    ensemble2: Noeud;
    
    constructor(ensemble1: Noeud, ensemble2: Noeud) {
        super("Produit")
        this.ensemble1 = ensemble1
        this.ensemble2 = ensemble2
    }

    estValide (): Boolean{
        return this.ensemble1.estValide() && this.ensemble2.estValide() 
    }

    toJSON(): string{
        let objet = {  
            type: this.type,
            ensemble1: JSON.parse(this.ensemble1.toJSON()),
            ensemble2: JSON.parse(this.ensemble2.toJSON())
        }
        return JSON.stringify(objet)
    }
    
    toLatex(): String{
        let chaine = "( "+ this.ensemble1.toLatex() + " )\ \\times\ ( " + this.ensemble2.toLatex() + " )"
        return chaine
    }

}