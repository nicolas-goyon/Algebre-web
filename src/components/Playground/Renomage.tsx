import React from 'react';
import { MathJax } from 'better-react-mathjax';


export default function Renommage({children}: any) {
  const latexString = "$\\rho_{name}(Student)$";

    return (
        <div className="border-solid pointer-events-none select-none border-2 bg-[#F9e4db] border-sky-500  rounded-md w-100">
            <MathJax inline dynamic>{latexString}</MathJax>
        </div>
    )

}