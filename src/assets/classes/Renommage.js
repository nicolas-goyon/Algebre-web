import { Noeud } from "./Noeud";

export class Renommage extends Noeud{
    
    constructor(champs, ensemble) {
        super("Renommage")
        this.champs = champs
        this.ensemble = ensemble
    }

    estValide (){
        return this.ensemble.estValide()
    }

    toJSON(){
        let objet = {}
        objet.type = this.type
        objet.champs = this.champs
        objet.ensemble = this.ensemble.toJSON()
        return JSON.stringify(objet)
    }


    

    toLatex(){
        let chaine = "\rho_{"
        for (i in champs){
            champ = champs[i]
            chaine += dep + " => " + arr + ", "
        }
        chaine = chaine.slice(0, -1);
        chaine += "}"
        chaine += "( "+ this.ensemble1.toLatex() + " )\ \\times\ ( " + this.ensemble1.toLatex() + " )"
        return chaine
    }

}