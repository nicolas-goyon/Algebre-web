
export class Noeud {



    constructor(type) {
        this.type = type
    }

    estValide (){
        return true
    }

    toJSON(){
        let objet = {}
        return JSON.stringify(objet)
    }

    static fromJSON(jsonObject){
        return JSON.parse(jsonObject)
    }

    toLatex(){
        return ""
    }


}
