import { JsonOperation } from "../Types/JsonOperation.tsx";
import { Noeud } from "./Noeud.tsx";
import { NoeudsBase } from "./Noeuds.tsx";
import Relation from "./Relation.tsx";
import WorkspaceRelations from "./WorkspaceRelation.tsx";
export class Ensemble extends Noeud {
  nom: string;
  constructor(nom: string, parent: Noeud | null = null) {
    super(NoeudsBase.Ensemble, parent)
    this.nom = nom
  }

  estValide(): Boolean {
    return true
  }

  execute(): Relation {
    return WorkspaceRelations.getTableByName(this.nom)
  }

  copy(): Noeud {
    return new Ensemble(this.nom)
  }

  static fromJson(data: JsonOperation): Ensemble {
    if (data["operation"] !== "Relation") {
      throw new Error("Erreur de JSON : type d'opération incorrect" + JSON.stringify(data));
    }
    // if (data.nom === undefined) {
    //   throw new Error("Erreur de JSON : nom manquant");
    // }

    let ens = new Ensemble("", null)
    if (data.nom !== undefined) {
      ens.nom = data.nom
    }
    return ens;
  }

  static toBlockly(): any {
    return {
      "type": "ensemble",
      "message0": "nom relation %1",
      "args0": [
        {
          "type": "input_value",
          "name": "name",
          "check": "String"
        }
      ],
      "previousStatement": "Noeud",
      "colour": 120,
      "tooltip": "",
      "helpUrl": ""
    }
  }
}