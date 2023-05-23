// import { arrayMerge } from "../tools/ArraysTools.tsx";
import { Noeud } from "./Noeud.tsx";
import { NoeudsBase } from "./Noeuds.tsx";

export class Selection extends Noeud{
    // condition : [[champ:String, condition: String, valeur: String]];
    condition: String;
    ensemble: Noeud | null;
    constructor(condition: String/*condition: [[champ:String, condition: String, valeur: String]]*/, ensemble: Noeud | null, index: number, parent : Noeud | null = null) {
        super(NoeudsBase.Selection, index , parent)
        this.condition = condition
        this.ensemble = ensemble
    }

    estValide (){
        if (this.ensemble == null){
            return false
        }
        return this.ensemble.estValide()
    }

    // toJSON(): string{
    //     let objet = {  
    //         type: this.type,
    //         condition: this.condition,
    //         ensemble: JSON.parse((this.ensemble != null) ? this.ensemble.toJSON() : "null"),
    //     }
    //     return JSON.stringify(objet)
    // }
    
    // toLatex(): String{
    //     let chaine = "\sigma_{"
    //     // for (let i in this.condition){
    //     //     chaine += i[0] + i[1] + i[2] + ", "
    //     // }
    //     chaine = chaine.slice(0, -2);
    //     chaine += "}"
    //     chaine += "( "+ (this.ensemble != null) ? this.ensemble!.toLatex() : "NULL" + " )"
    //     return chaine
    // }
    
    copy(): Noeud{
        return new Selection(
            this.condition, 
            (this.ensemble != null)?this.ensemble.copy():null, 
            this.index,
            this.parent            
            )
    }

    // deleteChild(index: Noeud): void {
    //     if (this.ensemble === index){
    //         this.ensemble = null
    //     }
    // }
    

    // fillArray(): Noeud[] {
    //     let arr: Noeud[] = [];
    //     if (this.ensemble != null){
    //         arr = this.ensemble.fillArray();
    //     }
    //     arr[this.index] = this;
    //     return arr;
    // }

    static toBlockly(): any{
        return {
            "type": "selection",
            "message0": "Selection %1 Relation %2",
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
            "tooltip": "Selectionne les tuples de la relation qui respectent la condition",
            "helpUrl": ""
        }
    }

}