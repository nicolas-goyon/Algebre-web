import { arrayMerge } from "../tools/ArraysTools.tsx";
import { Noeud } from "./Noeud.tsx";
import { NoeudsBase } from "./Noeuds.tsx";

export class Projection extends Noeud{
    champs: String[];
    ensemble: Noeud | null;
    
    constructor(champs: String[], ensemble: Noeud | null, index: number, parent : Noeud | null = null) {
        super(NoeudsBase.Projection, index, parent)
        this.champs = champs
        this.ensemble = ensemble
    }

    estValide (): Boolean{
        if (this.ensemble == null){
            return false
        }
        return this.ensemble.estValide()
    }

    toJSON(): string{
        let objet = {  
            type: this.type,
            champs: this.champs,
            ensemble: JSON.parse((this.ensemble != null) ? this.ensemble.toJSON() : "null"),
        }
        return JSON.stringify(objet)
    }



    toLatex(){
        let chaine = "\\pi_{"
        for (let i in this.champs){
            chaine += this.champs[i] + ", "
        }
        chaine = chaine.slice(0, -2);
        chaine += "}"
        chaine += "( "+ (this.ensemble != null) ? this.ensemble!.toLatex() : "NULL" + " )"
        return chaine
    }

    copy(): Noeud{
        return new Projection(
            this.champs, 
            (this.ensemble != null)?this.ensemble.copy():null, 
            this.index,
            this.parent            
            )
    }

    deleteChild(index: Noeud): void {
        if (this.ensemble === index){
            this.ensemble = null
        }
    }
    

    fillArray(): Noeud[] {
        let arr: Noeud[] = [];
        if (this.ensemble != null){
            arr = this.ensemble.fillArray();
        }
        arr[this.index] = this;
        return arr;
    }

    

    static toBlockly(): any{
        return {
            "type": "projection",
            "message0": "Projection %1 Ensemble %2",
            "args0": [
              {
                "type": "input_value",
                "name": "Champs",
                "check": "String"
              },
              {
                "type": "input_statement",
                "name": "Element",
                "check": "Noeud"
              }
            ],
            "previousStatement": "Noeud",
            "colour": 120,
            "tooltip": "",
            "helpUrl": ""
        }
    }

}
