import { Noeud } from "./Noeud.tsx";
import { NoeudsBase } from "./Noeuds.tsx";

export class Renommage extends Noeud{
    champs: {[index:string]: String};
    ensemble: Noeud;
    
    constructor(champs: {[index:string]: String}, ensemble: Noeud) {
        super(NoeudsBase.Renommage)
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
    

    toLatex(): String{
        let chaine = "\\rho_{"
        for (let i in this.champs){
            let arr = this.champs[i]
            let dep = i;
            chaine += dep + " => " + arr + ", "
        }
        chaine = chaine.slice(0, -2);
        chaine += "}"
        chaine += "( "+ this.ensemble.toLatex() + " )"
        return chaine
    }

}
