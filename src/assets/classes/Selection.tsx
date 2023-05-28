// import { arrayMerge } from "../tools/ArraysTools.tsx";
import { Condition, Link, createRecordChecker } from "../Helper/ConditionChecker.tsx";
import { getConditions } from "../Helper/Strings.tsx";
import { JsonOperation } from "../Types/JsonOperation.tsx";
import { Noeud } from "./Noeud.tsx";
import { NoeudsBase, fromJsonNextNode } from "./Noeuds.tsx";
import Relation from "./Relation.tsx";

export class Selection extends Noeud {
    // condition : [[champ:String, condition: String, valeur: String]];
    champs: string;
    ensemble: Noeud | null;
    constructor(champs: string, ensemble: Noeud | null, parent: Noeud | null = null) {
        super(NoeudsBase.Selection, parent)
        this.champs = champs
        this.ensemble = ensemble
    }

    estValide() {
        if (this.ensemble === null) {
            return false
        }
        return this.ensemble.estValide()
    }

    static fromJson(data: JsonOperation): Selection {
        if (data["operation"] !== "Selection") {
            throw new Error("Erreur de JSON : type d'opération incorrect" + JSON.stringify(data));
        }
        // if (data.relation === undefined) {
        //     throw new Error("Erreur de JSON : relation1 manquante");
        // }
        // if (data.champs === undefined) {
        //     throw new Error("Erreur de JSON : champs manquant");
        // }
        let join = new Selection("", null, null);
        if (data.relation !== undefined) {
            join.ensemble = fromJsonNextNode(data.relation)
        }
        if (data.champs !== undefined) {
            join.champs = data.champs
        }
        return join;
    }

    copy(): Noeud {
        return new Selection(
            this.champs,
            (this.ensemble !== null) ? this.ensemble.copy() : null,
            this.parent
        )
    }

    execute() : Relation {
        if (this.ensemble === null) {
            throw new Error("Erreur d'exécution : ensemble manquant");
        }
        let relation = this.ensemble.execute();
        const res = getConditions(this.champs)
        const conditions = res.conditions as Condition[];
        const conditionLinks = res.conditionLinks as Link[];
        // const checkFn = (row : Record<string, string>) : boolean => {
        const checkFn = createRecordChecker(conditions, conditionLinks);
        const newRelation = relation.selectRowsWithCheck(checkFn);
        return newRelation;
    }

    static toBlockly(): any {
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