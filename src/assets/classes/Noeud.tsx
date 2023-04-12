import { Noeuds } from "./Noeuds";
export abstract class Noeud {
    type : Noeuds;
    index : number;
    parent : Noeud | null = null;


    constructor(type: Noeuds, index: number, parent : Noeud | null = null) {
        this.type = type;
        this.index = index;
        this.parent = parent;
    }

    estValide():Boolean{
        return true;
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

    // delete from parent
    delete(){
        if (this.parent != null){
            this.parent.deleteChild(this)
        }
    }

    abstract deleteChild(index: Noeud):void;
    abstract fillArray(): Noeud[];
    // static abstract toBlockly(): any;
}
