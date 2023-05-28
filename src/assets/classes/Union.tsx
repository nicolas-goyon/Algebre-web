// import { arrayMerge } from "../tools/ArraysTools.tsx";
import { JsonOperation } from "../Types/JsonOperation.tsx";
import { Noeud } from "./Noeud.tsx";
import { NoeudsBase, fromJsonNextNode } from "./Noeuds.tsx";
import Relation from "./Relation.tsx";

export class Union extends Noeud {
  ensemble1: Noeud | null;
  ensemble2: Noeud | null;

  constructor(ensemble1: Noeud | null, ensemble2: Noeud | null, parent: Noeud | null = null) {
    super(NoeudsBase.Union)
    this.ensemble1 = ensemble1
    this.ensemble2 = ensemble2
  }

  estValide() {
    if (this.ensemble1 === null || this.ensemble2 === null) {
      return false
    }
    return this.ensemble1.estValide() && this.ensemble2.estValide()
  }


  static fromJson(data: JsonOperation): Union {
    if (data["operation"] !== "Union") {
      throw new Error("Erreur de JSON : type d'opération incorrect" + JSON.stringify(data));
    }
    // if (data.relation1 === undefined) {
    //   throw new Error("Erreur de JSON : relation1 manquante");
    // }
    // if (data.relation2 === undefined) {
    //   throw new Error("Erreur de JSON : relation1 manquante");
    // }
    let join = new Union(null, null, null);
    if (data.relation1 !== undefined) {
      join.ensemble1 = fromJsonNextNode(data.relation1);
    }
    if (data.relation2 !== undefined) {
      join.ensemble2 = fromJsonNextNode(data.relation2);
    }
    return join;
  }

  copy(): Noeud {
    return new Union(
      (this.ensemble1 !== null) ? this.ensemble1.copy() : null,
      (this.ensemble2 !== null) ? this.ensemble2.copy() : null,
      this.parent
    )
  }

  execute(): Relation {
    if (this.ensemble1 === null || this.ensemble2 === null) {
      throw new Error("Erreur d'exécution : ensemble manquant");
    }
    let relation1 = this.ensemble1.execute();
    let relation2 = this.ensemble2.execute();
    return relation1.union(relation2);
  }

  static toBlockly(): any {
    return {
      "type": "union",
      "message0": "union Relation 1 %1 Relation 2 %2",
      "args0": [
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
      "colour": 120,
      "tooltip": "Renvoie l'union de deux relations",
      "helpUrl": ""
    }
  }
}