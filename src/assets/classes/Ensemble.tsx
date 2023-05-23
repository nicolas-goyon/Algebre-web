import { Noeud } from "./Noeud.tsx";
import { NoeudsBase } from "./Noeuds.tsx";
export class Ensemble extends Noeud{
    nom : String;
    constructor(nom: String, index: number, parent : Noeud | null = null) {
        super(NoeudsBase.Ensemble, index, parent)
        this.nom = nom
    }

    estValide (): Boolean{
        return true 
    }

    // toJSON(): string{
    //     let objet = {  
    //         type: this.type,
    //         nom: this.nom,
    //     }
    //     return JSON.stringify(objet)
    // }

    // toLatex():String{
    //     let chaine = this.nom
    //     return chaine
    // }

    copy(): Noeud{
        return new Ensemble(this.nom, this.index)
    }

    // deleteChild(index: Noeud): void {
    //     // do nothing
    // }

    // fillArray(): Noeud[] {
    //     let array: Noeud[] = []
    //     array[this.index] = this;
    //     return array
    // }

    static toBlockly(): any{
        return {
            "type": "ensemble",
            "message0": "nom relation %1",
            "args0": [
              {
                "type": "input_value",
                "name": "name",
                "check": "String"
              }
            ],
            "previousStatement": "Noeud",
            "colour": 120,
            "tooltip": "",
            "helpUrl": ""
          }
    }
}