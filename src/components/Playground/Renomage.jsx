import MathJax from 'react-mathjax';

export default function Renommage(prop) {
    const latexString = "\\rho_{name}( \\sigma_{age > 18}(Students \\Join Enrollments) )"

    return (
        <div className="border-solid border-2 border-sky-500  rounded-md w-100px min-h-100px">
            <MathJax.Provider>
                <MathJax.Node formula={latexString} />
            </MathJax.Provider>
        </div>
    )
}