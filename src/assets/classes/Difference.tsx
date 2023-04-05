import { Noeud } from "./Noeud.tsx";
import { NoeudsBase } from "./Noeuds.tsx";

export class Difference extends Noeud{
    ensemble1: Noeud;
    ensemble2: Noeud;
    constructor(ensemble1: Noeud, ensemble2: Noeud, index: number) {
        super(NoeudsBase.Difference , index)
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
            ensemble2: JSON.parse(this.ensemble2.toJSON()),
        }
        return JSON.stringify(objet)
    }



    toLatex(): String{
        let chaine = "( "+ this.ensemble1.toLatex() + " )\ \\\ ( " + this.ensemble2.toLatex() + " )"
        return chaine
    }
     
    copy(): Noeud{
        return new Difference(this.ensemble1.copy(), this.ensemble2.copy(), this.index)
    }
    

}