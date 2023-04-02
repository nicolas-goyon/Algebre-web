import React from 'react';
import { MathJax } from 'better-react-mathjax';

export default function Renommage({children}: any) {
  const latexString = "$\\rho_{name \\Rightarrow nom}$";

    return (
        <div className="border-solid pointer-events-none select-none border-2 border-light-900  rounded-md w-100">
            <MathJax inline dynamic>{latexString}</MathJax>
        </div>
    )

}