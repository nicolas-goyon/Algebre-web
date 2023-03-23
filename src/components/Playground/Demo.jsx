import Renommage from "./Renomage";
import {Noeud} from '../../assets/classes/Noeud';




export default function Demo(prop) {
    const latexString = "\\pi_{name}( \\sigma_{age > 18}(Students \\Join Enrollments) )"
    const blockFormula = `\\int_0^\\infty x^2 dx`;

    return (
        <div className="flex flex-row w-full gap-5">
            <div className="w-full border-2 h-40 p-10">
                <Renommage />
                
            </div>
            
            <div className="w-full border-2 h-40">
                
            </div>
        </div>
    )
}