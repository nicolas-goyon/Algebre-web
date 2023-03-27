import React from 'react';
import MathJax from 'react-mathjax';

export default function Selection(prop: any) {
    const latexString = "\\sigma_{name='Dupond'}( Student )"

    return (
        <div className="border-solid pointer-events-none select-none border-2 bg-[#F9e4db] border-sky-500  rounded-md w-100px min-h-100px p-4">
            <h1>Selection</h1>
            <MathJax.Provider>
                <MathJax.Node formula={latexString} />
            </MathJax.Provider>
        </div>
    )
}