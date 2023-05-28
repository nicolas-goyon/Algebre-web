// import { arrayMerge } from "../tools/ArraysTools.tsx";
import { JsonOperation } from "../Types/JsonOperation.tsx";
import { Noeud } from "./Noeud.tsx";
import { NoeudsBase, fromJsonNextNode } from "./Noeuds.tsx";
import Relation from "./Relation.tsx";

export class Projection extends Noeud {
    champs: String;
    ensemble: Noeud | null;

    constructor(champs: String, ensemble: Noeud | null, parent: Noeud | null = null) {
        super(NoeudsBase.Projection, parent)
        this.champs = champs
        this.ensemble = ensemble
    }

    estValide(): Boolean {
        if (this.ensemble === null) {
            return false
        }
        return this.ensemble.estValide()
    }

    execute(): Relation {
        if (this.ensemble === null) {
            throw new Error("Erreur d'exécution : ensemble manquant");
        }
        let relation = this.ensemble.execute()
        const champs = this.champs.split(",")
        return relation.selectColumns(champs)
    }


    copy(): Noeud {
        return new Projection(
            this.champs,
            (this.ensemble !== null) ? this.ensemble.copy() : null,
            this.parent
        )
    }


    static fromJson(data: JsonOperation): Projection {
        if (data["operation"] !== "Projection") {
            throw new Error("Erreur de JSON : type d'opération incorrect"+ JSON.stringify(data));
        }
        // if (data.relation === undefined) {
        //     throw new Error("Erreur de JSON : relation1 manquante");
        // }
        // if (data.champs === undefined) {
        //     throw new Error("Erreur de JSON : champs manquant");
        // }
        let join = new Projection("", null, null);
        if (data.relation !== undefined) {
            join.ensemble = fromJsonNextNode(data.relation)
        }
        if (data.champs !== undefined) {
            join.champs = data.champs
        }
        return join;
    }



    static toBlockly(): any {
        return {
            "type": "projection",
            "message0": "Projection %1 Relation %2",
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
            "tooltip": "Selectionne certains champs d'une relation",
            "helpUrl": ""
        }
    }

}
