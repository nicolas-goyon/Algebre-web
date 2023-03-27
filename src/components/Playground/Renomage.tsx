import React from 'react';
import MathJax from 'react-mathjax';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';


export default function Renommage(prop: any) {
    const latexString = "\\rho_{name}( Student )";
    const RENOMMAGE_TYPE = 'RENOMMAGE';
    // Définition du glisser-déposer
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'RENOMMAGE',
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));

    return (
        <div className="border-solid pointer-events-none select-none border-2 bg-[#F9e4db] border-sky-500  rounded-md w-100px min-h-100px p-4">
            <h1>Renommage</h1>
            <MathJax.Provider>
                <MathJax.Node formula={latexString} />
            </MathJax.Provider>
        </div>
    )
}