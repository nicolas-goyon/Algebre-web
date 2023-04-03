import React from 'react';
import { MathJax } from 'better-react-mathjax';

export default function Produit(prop: any) {
    const latexString = "$\times$"
    return (
        <div className="border-solid pointer-events-none select-none border-b-2 border-t-2 border-light-900  w-100 px-1">
            <MathJax inline dynamic>{latexString}</MathJax>
        </div>
    )
}
