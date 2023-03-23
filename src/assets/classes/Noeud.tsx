
export abstract class Noeud {
    type : String;


    constructor(type: String) {
        this.type = type
    }

    estValide():Boolean{
        return true
    }

    toJSON():String{
        let objet = {}
        return JSON.stringify(objet)
    }

    // static fromJSON(jsonObject: JSON): Noeud{
    //     return JSON.parse(jsonObject)
    // }

    toLatex():String{
        return ""
    }


}
