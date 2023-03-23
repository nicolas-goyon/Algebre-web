import React from 'react';
import { Noeud } from "./Noeud.tsx";

export class Projection extends Noeud{
    champs: [String];
    ensemble: Noeud;
    
    constructor(champs: [String], ensemble: Noeud) {
        super("Projection")
        this.champs = champs
        this.ensemble = ensemble
    }

    estValide (): Boolean{
        return this.ensemble.estValide()
    }

    toJSON(): String{
        let objet = {  
            type: this.type,
            champs: this.champs,
            ensemble: JSON.stringify(this.ensemble)
        }
        return JSON.stringify(objet)
    }



    toLatex(){
        let chaine = "\pi_{"
        for (let i in this.champs){
            chaine += i + ", "
        }
        chaine = chaine.slice(0, -2);
        chaine += "}"
        chaine += "( "+ this.ensemble.toLatex() + " )"
        return chaine
    }

}
