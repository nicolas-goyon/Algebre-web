import React from "react"
import { Renommage, Selection, Projection, Ensemble, Difference, Union, Intersection, Produit } from "../../components/Playground/NoeudsComponents"
import { Noeud } from "./Noeud"

export { Noeud } from "./Noeud"
export { Ensemble } from "./Ensemble"

export { Renommage } from "./Renommage"
export { Selection } from "./Selection"
export { Projection } from "./Projection"

export { Union } from "./Union"
export { Produit } from "./Produit"
export { Intersection } from "./Intersection"
export { Difference } from "./Difference"
// export { Jointure } from "./Jointure"


export const NoeudsBase = {
    // Noeud de base 
    Noeud:{
        name:"Noeud",
        component: (<div></div>),
        children: 0,
        hasChamp: false,
        isBinary: false,
        class: Noeud
    },
    // Noeuds avec 0 enfants
    Ensemble:{
        name:"Ensemble",
        component: (<Ensemble/>),
        children: 0,
        hasChamp: true,
        isBinary: false,
        class: Ensemble
    },

    // Noeuds avec 1 enfant
    Renommage:{
        name:"Renommage",
        component: (<Renommage/>),
        children: 1,
        hasChamp: true,
        isBinary: false,
        class: Renommage
    },
    Selection:{
        name:"Selection",
        component: (<Selection/>),
        children: 1,
        hasChamp: true,
        isBinary: false,
        class: Selection
    },
    Projection:{
        name:"Projection",
        component: (<Projection/>),
        children: 1,
        hasChamp: true,
        isBinary: false,
        class: Projection
    },

    // Noeuds avec 2 enfants
    Union:{
        name:"Union",
        component: (<Union/>),
        children: 2,
        hasChamp: false,
        isBinary: true,
        class: Union
    },
    Produit:{
        name:"Produit",
        component: (<Produit/>),
        children: 2,
        hasChamp: false,
        isBinary: true,
        class: Produit
    },
    Intersection:{
        name:"Intersection",
        component: (<Intersection/>),
        children: 2,
        hasChamp: false,
        isBinary: true,
        class: Intersection
    },
    Difference:{
        name:"Difference",
        component: (<Difference/>),
        children: 2,
        hasChamp: false,
        isBinary: true,
        class: Difference
    },

    // Jointures
    // Jointure:{
    //     name:"Jointure",
    //     component: (<Jointure/>),
    //     children: 2,
    //     hasChamp: false,
    //     isBinary: true,
    //     class: Jointure
    // },
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
            default:
                return NoeudsBase.Noeud
        }
    }

}
type Values<Type> = Type[keyof Type];

export type Noeuds = Values<typeof NoeudsBase>;
