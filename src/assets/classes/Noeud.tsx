import { Noeuds } from "./Noeuds";
export abstract class Noeud {
    type : Noeuds;


    constructor(type: Noeuds) {
        this.type = type
    }

    estValide():Boolean{
        return true
    }

    toJSON(): string{
        let objet = {}
        return JSON.stringify(objet)
    }

    // static fromJSON(jsonObject: JSON): Noeud{
    //     return JSON.parse(jsonObject)
    // }

    toLatex():String{
        return ""
    }


}
