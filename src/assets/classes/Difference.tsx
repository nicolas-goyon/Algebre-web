import { Noeud } from "./Noeud.tsx";
import { NoeudsBase, fromJsonNextNode } from "./Noeuds.tsx";
import { JsonOperation } from "../Types/JsonOperation.tsx";
import Relation from "./Relation.tsx";
// import { arrayMerge } from "../tools/ArraysTools.tsx";

export class Difference extends Noeud {
  ensemble1: Noeud | null;
  ensemble2: Noeud | null;
  constructor(ensemble1: Noeud | null, ensemble2: Noeud | null, parent: Noeud | null = null) {
    super(NoeudsBase.Difference, parent)
    this.ensemble1 = ensemble1
    this.ensemble2 = ensemble2
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
    let relation1 = this.ensemble1.execute()
    let relation2 = this.ensemble2.execute()
    return relation1.difference(relation2)
  }

  static fromJson(data: JsonOperation): Difference {
    if (data["operation"] !== "Difference") {
      throw new Error("Erreur de JSON : type d'opération incorrect" + JSON.stringify(data));
    }
    // if (data.relation1 === undefined) {
    //   throw new Error("Erreur de JSON : relation1 manquante");
    // }
    // if (data.relation2 === undefined) {
    //   throw new Error("Erreur de JSON : relation2 manquante");
    // }
    let diff = new Difference(null, null,)
    if (data.relation1 !== undefined) {
      diff.ensemble1 = fromJsonNextNode(data.relation1)
    }
    if (data.relation2 !== undefined) {
      diff.ensemble2 = fromJsonNextNode(data.relation2)
    }
    return diff;
  }


  copy(): Noeud {
    return new Difference(
      (this.ensemble1 != null) ? this.ensemble1.copy() : null,
      (this.ensemble2 != null) ? this.ensemble2.copy() : null,
      this.parent
    )
  }



  static toBlockly(): any {
    return {
      "type": "difference",
      "message0": "difference Relation 1 %1 Relation 2 %2",
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
      "tooltip": "Relation 1 - relation 2",
      "helpUrl": ""
    }
  }
}