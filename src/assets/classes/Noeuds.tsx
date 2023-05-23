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


export { Noeud, Ensemble, Renommage, Selection, Projection, Union, Produit, Intersection, Difference, Jointure, Division }

export const NoeudsBase = {
    // Noeud de base 
    Noeud:{
        name:"Noeud",
        children: 0,
        hasChamp: false,
        isBinary: false,
        class: Noeud
    },
    // Noeuds avec 0 enfants
    Ensemble:{
        name:"Ensemble",
        children: 0,
        hasChamp: true,
        isBinary: false,
        class: Ensemble
    },

    // Noeuds avec 1 enfant
    Renommage:{
        name:"Renommage",
        children: 1,
        hasChamp: true,
        isBinary: false,
        class: Renommage
    },
    Selection:{
        name:"Selection",
        children: 1,
        hasChamp: true,
        isBinary: false,
        class: Selection
    },
    Projection:{
        name:"Projection",
        children: 1,
        hasChamp: true,
        isBinary: false,
        class: Projection
    },

    // Noeuds avec 2 enfants
    Union:{
        name:"Union",
        children: 2,
        hasChamp: false,
        isBinary: true,
        class: Union
    },
    Produit:{
        name:"Produit",
        children: 2,
        hasChamp: false,
        isBinary: true,
        class: Produit
    },
    Intersection:{
        name:"Intersection",
        children: 2,
        hasChamp: false,
        isBinary: true,
        class: Intersection
    },
    Difference:{
        name:"Difference",
        children: 2,
        hasChamp: false,
        isBinary: true,
        class: Difference
    },

    Jointure:{
        name:"Jointure",
        children: 2,
        hasChamp: false,
        isBinary: true,
        class: Jointure
    },
    Division:{
        name:"Division",
        children: 2,
        hasChamp: false,
        isBinary: true,
        class: Division
    }
}

export class NoeudsGet{
    static getNoeuds(noeud: String): Noeuds{
        switch(noeud){
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
