import { arrayMerge } from "../tools/ArraysTools.tsx";
import { Noeud } from "./Noeud.tsx";
import { NoeudsBase } from "./Noeuds.tsx";

export class Renommage extends Noeud{
    champs: {[index:string]: String};
    ensemble: Noeud | null;
    
    constructor(champs: {[index:string]: String}, ensemble: Noeud | null, index: number, parent : Noeud | null = null) {
        super(NoeudsBase.Renommage, index , parent)
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
    

    toLatex(): String{
        let chaine = "\\rho_{"
        for (let i in this.champs){
            let arr = this.champs[i]
            let dep = i;
            chaine += dep + " => " + arr + ", "
        }
        chaine = chaine.slice(0, -2);
        chaine += "}"
        chaine += "( "+ (this.ensemble != null) ? this.ensemble!.toLatex() : "NULL" + " )"
        return chaine
    }

    copy(): Noeud{
        return new Renommage(
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

    static toBlockly(): any {
        return {
            "type": "renommage",
            "message0": "Renommage %1 Relation %2",
            "args0": [
              {
                "type": "input_value",
                "name": "Champs",
                "check": "String"
              },
              {
                "type": "input_statement",
                "name": "ensemble",
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
