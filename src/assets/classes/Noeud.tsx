import { Noeuds } from "./Noeuds";
export abstract class Noeud {
    type : Noeuds;
    index : number;


    constructor(type: Noeuds, index: number) {
        this.type = type
        this.index = index
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

    abstract copy():Noeud;


}
