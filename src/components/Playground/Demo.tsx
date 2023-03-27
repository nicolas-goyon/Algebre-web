import Renommage from "./Renomage";
import React from 'react';
import { Projection } from "../../assets/classes/Projection";
import { Ensemble } from "../../assets/classes/Ensemble";
import { Renommage as RenommageClass } from "../../assets/classes/Renommage";
import { Difference } from "src/assets/classes/Difference";
import Selection from "./Selection";


let c = ["id", "test"]
let e = new Ensemble("Etudiant")
let f = new Ensemble("Test")
let p = new Projection(c, e)

let chmpRen = {
    "id": "id2",
    "test": "test2",
}

let ren = new RenommageClass(chmpRen, e)
let dif = new Difference(ren,p)

console.log(p.toLatex());

console.log(dif.toLatex());
console.log(dif.toJSON())




export default function Demo(prop: any) {
    return (
        <div className="flex flex-row w-full gap-5">
            <div className="flex flex-col w-full border-2 gap-5 min-h-40 p-10">
                <Renommage />
                <Selection />
                
            </div>
            
            <div className="w-full border-2 h-40">
                
            </div>
        </div>
    )
}