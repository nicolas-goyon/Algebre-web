import { Noeud } from "./Noeud";

export class Selection extends Noeud{
    
    constructor(condition, ensemble) {
        super("Selection")
        this.condition = condition
        this.ensemble = ensemble
    }

    estValide (){
        return this.ensemble.estValide()
    }

    toJSON(){
        let objet = {}
        objet.type = this.type
        objet.condition = this.condition.toJSON()
        objet.ensemble = this.ensemble.toJSON()
        return JSON.stringify(objet)
    }

    

}