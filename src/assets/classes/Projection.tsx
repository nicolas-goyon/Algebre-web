import { Noeud } from "./Noeud.tsx";
import { NoeudsBase } from "./Noeuds.tsx";

export class Projection extends Noeud{
    champs: String[];
    ensemble: Noeud;
    
    constructor(champs: String[], ensemble: Noeud) {
        super(NoeudsBase.Projection)
        this.champs = champs
        this.ensemble = ensemble
    }

    estValide (): Boolean{
        return this.ensemble.estValide()
    }

    toJSON(): string{
        let objet = {  
            type: this.type,
            champs: this.champs,
            ensemble: JSON.parse(this.ensemble.toJSON())
        }
        return JSON.stringify(objet)
    }



    toLatex(){
        let chaine = "\\pi_{"
        for (let i in this.champs){
            chaine += this.champs[i] + ", "
        }
        chaine = chaine.slice(0, -2);
        chaine += "}"
        chaine += "( "+ this.ensemble.toLatex() + " )"
        return chaine
    }

}
