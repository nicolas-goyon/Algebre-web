import { Noeud } from "./Noeud.tsx";

export class Difference extends Noeud{
    ensemble1: Noeud;
    ensemble2: Noeud;
    constructor(ensemble1: Noeud, ensemble2: Noeud) {
        super("Difference")
        this.ensemble1 = ensemble1
        this.ensemble2 = ensemble2
    }

    estValide (): Boolean{
        return this.ensemble1.estValide() && this.ensemble2.estValide() 
    }
    toJSON(): String{
        let objet = {  
            type: this.type,
            ensemble1: this.ensemble1.toJSON(),
            ensemble2: this.ensemble2.toJSON(),
        }
        return JSON.stringify(objet)
    }



    toLatex(): String{
        let chaine = "( "+ this.ensemble1.toLatex() + " )\ \\\ ( " + this.ensemble1.toLatex() + " )"
        return chaine
    }
    

}