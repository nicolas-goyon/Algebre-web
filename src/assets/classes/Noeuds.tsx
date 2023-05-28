import { Ensemble } from "./Ensemble"
import { Renommage } from "./Renommage"
import { Selection } from "./Selection"
import { Projection } from "./Projection"
import { Union } from "./Union"
import { Produit } from "./Produit"
import { Intersection } from "./Intersection"
import { Difference } from "./Difference"
import { Jointure } from "./Jointure"
import { Division } from "./Division"
import { Noeud } from "./Noeud"
import { JsonOperation } from "../Types/JsonOperation"
import type { Noeud as NoeudType } from "./Noeud"


export { Noeud } from "./Noeud"
export { Ensemble } from "./Ensemble"

export { Renommage } from "./Renommage"
export { Selection } from "./Selection"
export { Projection } from "./Projection"

export { Union } from "./Union"
export { Produit } from "./Produit"
export { Intersection } from "./Intersection"
export { Difference } from "./Difference"
export { Jointure } from "./Jointure"
export { Division } from "./Division"



export const NoeudsBase = {
    // Noeud de base 
    Noeud: {
        name: "Noeud",
        children: 0,
        hasChamp: false,
        isBinary: false,
        class: Noeud
    },
    // Noeuds avec 0 enfants
    Ensemble: {
        name: "Ensemble",
        children: 0,
        hasChamp: true,
        isBinary: false,
        class: Ensemble
    },

    // Noeuds avec 1 enfant
    Renommage: {
        name: "Renommage",
        children: 1,
        hasChamp: true,
        isBinary: false,
        class: Renommage
    },
    Selection: {
        name: "Selection",
        children: 1,
        hasChamp: true,
        isBinary: false,
        class: Selection
    },
    Projection: {
        name: "Projection",
        children: 1,
        hasChamp: true,
        isBinary: false,
        class: Projection
    },

    // Noeuds avec 2 enfants
    Union: {
        name: "Union",
        children: 2,
        hasChamp: false,
        isBinary: true,
        class: Union
    },
    Produit: {
        name: "Produit",
        children: 2,
        hasChamp: false,
        isBinary: true,
        class: Produit
    },
    Intersection: {
        name: "Intersection",
        children: 2,
        hasChamp: false,
        isBinary: true,
        class: Intersection
    },
    Difference: {
        name: "Difference",
        children: 2,
        hasChamp: false,
        isBinary: true,
        class: Difference
    },

    Jointure: {
        name: "Jointure",
        children: 2,
        hasChamp: false,
        isBinary: true,
        class: Jointure
    },
    Division: {
        name: "Division",
        children: 2,
        hasChamp: false,
        isBinary: true,
        class: Division
    }
}


export function fromJsonNextNode(jsonObject: JsonOperation): NoeudType | null {
    switch (jsonObject["operation"]) {
        case "Jointure":
            return Jointure.fromJson(jsonObject);
        case "Projection":
            return Projection.fromJson(jsonObject);
        case "Selection":
            return Selection.fromJson(jsonObject);
        case "Relation":
            return Ensemble.fromJson(jsonObject);
        case "Renommage":
            return Renommage.fromJson(jsonObject);
        case "Union":
            return Union.fromJson(jsonObject);
        case "Produit":
            return Produit.fromJson(jsonObject);
        case "Intersection":
            return Intersection.fromJson(jsonObject);
        case "Difference":
            return Difference.fromJson(jsonObject);
        case "Division":
            return Division.fromJson(jsonObject);
        default:
            return null
            // throw new Error("Noeud type not found" + JSON.stringify(jsonObject));
    }
    // return new Difference(null, null, null);
}
export class NoeudsGet {
    static getNoeuds(noeud: String): Noeuds {
        switch (noeud) {
            case "Noeud":
                return NoeudsBase.Noeud
            case "Ensemble":
                return NoeudsBase.Ensemble
            case "Renommage":
                return NoeudsBase.Renommage
            case "Selection":
                return NoeudsBase.Selection
            case "Projection":
                return NoeudsBase.Projection
            case "Union":
                return NoeudsBase.Union
            case "Produit":
                return NoeudsBase.Produit
            case "Intersection":
                return NoeudsBase.Intersection
            case "Difference":
                return NoeudsBase.Difference
            case "Jointure":
                return NoeudsBase.Jointure
            default:
                return NoeudsBase.Noeud
        }
    }

}
type Values<Type> = Type[keyof Type];

export type Noeuds = Values<typeof NoeudsBase>;
