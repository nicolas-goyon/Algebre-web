import React from "react"
import { Renommage, Selection, Projection, Ensemble } from "../../components/Playground/NoeudsComponents"

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


export enum Noeuds {
    // Noeud de base 
    Noeud = "Noeud",
    Ensemble = "Ensemble",
    
    // Noeuds avec 1 enfant
    Renommage = "Renommage",
    Selection = "Selection",
    Projection = "Projection",
    
    // Noeuds avec 2 enfants
    Union = "Union",
    Produit = "Produit",
    Intersection = "Intersection",
    Difference = "Difference",
    
    // Jointures
    // Jointure = "Jointure",

}
export class NoeudsGet{
    static getNoeuds(noeud: String): Noeuds{
        switch(noeud){
            case "Noeud":
                return Noeuds.Noeud
            case "Ensemble":
                return Noeuds.Ensemble
            case "Renommage":
                return Noeuds.Renommage
            case "Selection":
                return Noeuds.Selection
            case "Projection":
                return Noeuds.Projection
            case "Union":
                return Noeuds.Union
            case "Produit":
                return Noeuds.Produit
            case "Intersection":
                return Noeuds.Intersection
            case "Difference":
                return Noeuds.Difference
            default:
                return  Noeuds.Noeud
        }
    }

    static getJSXElement(noeud: Noeuds): JSX.Element{
        switch(noeud){
            case Noeuds.Noeud:
                // return <Noeud />
                return <div></div>
            case Noeuds.Ensemble:
                return <Ensemble />
            case Noeuds.Renommage:
                return <Renommage />
            case Noeuds.Selection:
                return <Selection />
            case Noeuds.Projection:
                return <Projection />
            // case Noeuds.Union:
            //     return <Union />
            // case Noeuds.Produit:
            //     return <Produit />
            // case Noeuds.Intersection:
            //     return <Intersection />
            // case Noeuds.Difference:
            //     return <Difference />
            default:
                // return <Noeud />
                return <div></div>
        }
    }
}