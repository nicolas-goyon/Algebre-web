// import { arrayMerge } from "../tools/ArraysTools.tsx";
import { JsonOperation } from "../Types/JsonOperation.tsx";
import { Noeud } from "./Noeud.tsx";
import { NoeudsBase, fromJsonNextNode } from "./Noeuds.tsx";
import Relation from "./Relation.tsx";

export class Jointure extends Noeud {
    ensemble1: Noeud | null;
    ensemble2: Noeud | null;
    champ: string | null;

    constructor(ensemble1: Noeud | null, ensemble2: Noeud | null, champ: string | null, parent: Noeud | null = null) {
        super(NoeudsBase.Jointure)
        this.ensemble1 = ensemble1
        this.ensemble2 = ensemble2
        this.champ = champ

    }

    estValide(): Boolean {
        if (this.ensemble1 === null || this.ensemble2 === null) {
            return false
        }
        return this.ensemble1.estValide() && this.ensemble2.estValide()
    }

    execute(): Relation {
        if (this.ensemble1 === null || this.ensemble2 === null) {
            throw new Error("Erreur d'exécution : ensemble1 ou ensemble2 manquant");
        }
        if (this.champ === null) {
            throw new Error("Erreur d'exécution : champ manquant");
        }
        let relation1 = this.ensemble1.execute()
        let relation2 = this.ensemble2.execute()
        // Champs : champ1, champ2, champ3, ... => ligne1.champ1 == ligne2.champ1 && ligne1.champ2 == ligne2.champ2 && ligne1.champ3 == ligne2.champ3 && ...
        const champs = this.champ.split(", ")
        const joinCheck = (ligne1: Record<string, any>, ligne2: Record<string, any>) : boolean => {
            return champs.every((champ: string) => ligne1[champ] == ligne2[champ])
        }
        return relation1.join(relation2, joinCheck)
    }
    
    copy(): Noeud {
        return new Jointure(
            (this.ensemble1 !== null) ? this.ensemble1.copy() : null,
            (this.ensemble2 !== null) ? this.ensemble2.copy() : null,
            this.champ,
            this.parent
        )
    }


    static fromJson(data: JsonOperation): Jointure {
        if (data["operation"] !== "Jointure") {
            throw new Error("Erreur de JSON : type d'opération incorrect" + JSON.stringify(data));
        }
        // if (data.relation1 === undefined) {
        //     throw new Error("Erreur de JSON : relation1 manquante");
        // }
        // if (data.relation2 === undefined) {
        //     throw new Error("Erreur de JSON : relation2 manquante");
        // }
        // if (data.champs === undefined) {
        //     throw new Error("Erreur de JSON : champs manquant");
        // }
        let join = new Jointure(null, null, null)
        if (data.relation1 !== undefined) {
            join.ensemble1 = fromJsonNextNode(data.relation1)
        }
        if (data.relation2 !== undefined) {
            join.ensemble2 = fromJsonNextNode(data.relation2)
        }
        if (data.champs !== undefined) {
            join.champ = data.champs
        }
        return join;
    }

    static toBlockly(): any {
        return {
            "type": "jointure",
            "message0": "Jointure %1 %2 %3",
            "args0": [
                {
                    "type": "input_value",
                    "name": "Champs",
                    "check": "String"
                },
                {
                    "type": "input_statement",
                    "name": "ensemble1",
                    "check": "Noeud"
                },
                {
                    "type": "input_statement",
                    "name": "ensemble2",
                    "check": "Noeud"
                }
            ],
            "previousStatement": "Noeud",
            "colour": 230,
            "tooltip": "Représente une jointure entre deux ensembles",
            "helpUrl": ""
        }
    }
}