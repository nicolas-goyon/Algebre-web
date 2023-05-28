import { Noeuds } from "./Noeuds";
import Relation from "./Relation";
export abstract class Noeud {
    type : Noeuds;
    parent : Noeud | null = null;


    constructor(type: Noeuds, parent : Noeud | null = null) {
        this.type = type;
        this.parent = parent;
    }

    estValide():Boolean{
        return true;
    }

    abstract execute():Relation;

    abstract copy():Noeud;

}
