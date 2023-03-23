import Renommage from "./Renomage";
import MathJax from 'react-mathjax';
import {Noeud} from '../../assets/classes/Noeud';




export default function Demo(prop) {
    const latexString = "\\pi_{name}( \\sigma_{age > 18}(Students \\Join Enrollments) )"
    const blockFormula = `\\int_0^\\infty x^2 dx`;

    return (
        <div className="columns-2 w-full">
            <script>
            </script>
            <div className="w-full border-2 min-h-100">
                <Renommage />
                <MathJax.Provider>
                    <div>
                        <p>Inline formula: <MathJax.Node inline formula={latexString} /></p>
                        <hr></hr>
                        <p>Block formula:</p>
                        <MathJax.Node formula={blockFormula} />
                    </div>
                </MathJax.Provider>
            </div>
        </div>
    )
}