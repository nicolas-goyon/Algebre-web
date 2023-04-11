import { arrayMerge } from "../tools/ArraysTools.tsx";
import { Noeud } from "./Noeud.tsx";
import { NoeudsBase } from "./Noeuds.tsx";

export class Union extends Noeud{
    ensemble1: Noeud | null;
    ensemble2: Noeud | null;
    
    constructor(ensemble1: Noeud | null, ensemble2: Noeud | null, index: number, parent : Noeud | null = null) {
        super(NoeudsBase.Union, index)
        this.ensemble1 = ensemble1
        this.ensemble2 = ensemble2
    }

    estValide (){
        if (this.ensemble1 == null || this.ensemble2 == null){
            return false
        }
        return this.ensemble1.estValide() && this.ensemble2.estValide()
    }


    toJSON(): string{
        let objet = {  
            type: this.type,
            ensemble1: JSON.parse((this.ensemble1 != null) ? this.ensemble1.toJSON() : "null"),
            ensemble2: JSON.parse((this.ensemble2 != null) ? this.ensemble2.toJSON() : "null"),
        }
        return JSON.stringify(objet)
    }
    
    toLatex(){
        let chaine = "( "+ (this.ensemble1 != null) ? this.ensemble1!.toLatex() : "NULL" + " )\ \\cup\ ( " +(this.ensemble2 != null) ? this.ensemble2!.toLatex() : "NULL" + " )"
        return chaine
    }

    copy(): Noeud{
        return new Union(
            (this.ensemble1 != null)?this.ensemble1.copy():null, 
            (this.ensemble2 != null)?this.ensemble2.copy():null, 
            this.index,
            this.parent            
            )
    }

    deleteChild(index: Noeud): void {
        if (this.ensemble1 === index){
            this.ensemble1 = null
        }
        if (this.ensemble2 === index){
            this.ensemble2 = null
        }
    }
    
    fillArray(): Noeud[] {
        let array :Noeud[] = []
        if (this.ensemble1 != null){
            array = this.ensemble1.fillArray()
        }
        if (this.ensemble2 != null){
            array = arrayMerge(array, this.ensemble2.fillArray())
        }
        array[this.index] = this;
        return array
    }

}