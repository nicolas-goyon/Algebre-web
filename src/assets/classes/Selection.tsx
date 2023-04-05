import { Noeud } from "./Noeud.tsx";
import { NoeudsBase } from "./Noeuds.tsx";

export class Selection extends Noeud{
    condition : [[champ:String, condition: String, valeur: String]];
    ensemble: Noeud;
    constructor(condition: [[champ:String, condition: String, valeur: String]], ensemble: Noeud, index: number) {
        super(NoeudsBase.Selection, index)
        this.condition = condition
        this.ensemble = ensemble
    }

    estValide (){
        return this.ensemble.estValide()
    }

    toJSON(): string{
        let objet = {  
            type: this.type,
            condition: this.condition,
            ensemble: JSON.parse(this.ensemble.toJSON())
        }
        return JSON.stringify(objet)
    }
    
    toLatex(): String{
        let chaine = "\sigma_{"
        for (let i in this.condition){
            chaine += i[0] + i[1] + i[2] + ", "
        }
        chaine = chaine.slice(0, -2);
        chaine += "}"
        chaine += "( "+ this.ensemble.toLatex() + " )"
        return chaine
    }
    
    copy(): Noeud{
        return new Selection(this.condition, this.ensemble.copy(), this.index)
    }
    

}