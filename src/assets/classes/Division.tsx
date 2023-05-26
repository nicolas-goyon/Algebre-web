import { JsonOperation } from "../Types/JsonOperation";
import { Noeud } from "./Noeud";
import { NoeudsBase, fromJsonNextNode } from "./Noeuds";
import Relation from "./Relation";
// import { arrayMerge } from "../tools/ArraysTools";

export class Division extends Noeud {
  ensemble1: Noeud | null;
  ensemble2: Noeud | null;
  constructor(ensemble1: Noeud | null, ensemble2: Noeud | null, parent: Noeud | null = null) {
    super(NoeudsBase.Division, parent)
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
    return relation1.division(relation2)
  }

  copy(): Noeud {
    return new Division(
      (this.ensemble1 !== null) ? this.ensemble1.copy() : null,
      (this.ensemble2 !== null) ? this.ensemble2.copy() : null,
      this.parent
    )
  }

  static fromJson(data: JsonOperation): Division {
    if (data["operation"] !== "Division") {
      throw new Error("Erreur de JSON : type d'opération incorrect" + JSON.stringify(data));
    }
    // if (data.relation1 === undefined) {
    //   throw new Error("Erreur de JSON : relation1 manquante");
    // }
    // if (data.relation2 === undefined) {
    //   throw new Error("Erreur de JSON : relation2 manquante");
    // }
    let div = new Division(null, null, null)
    if (data.relation1 !== undefined) {
      div.ensemble1 = fromJsonNextNode(data.relation1)
    }
    if (data.relation2 !== undefined) {
      div.ensemble2 = fromJsonNextNode(data.relation2)
    }
    return div;
  }

  static toBlockly(): any {
    return {
      "type": "division",
      "message0": "Division R %1 S %2",
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
      "tooltip": "R ÷ S",
      "helpUrl": ""
    }
  }
}