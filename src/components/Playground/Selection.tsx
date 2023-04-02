import React from 'react';
import { MathJax } from 'better-react-mathjax';

export default function Selection(prop: any) {
    const latexString = "$\\sigma_{name='Dupond'}$"
    return (
        <div className="border-solid pointer-events-none select-none border-b-2 border-light-900 w-100 px-1">
            <MathJax inline dynamic>{latexString}</MathJax>
        </div>
    )
}
