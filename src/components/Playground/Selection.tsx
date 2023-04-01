import React, { useState } from 'react';
import MathJax from 'react-mathjax';
import {DndContext} from '@dnd-kit/core';
import {Droppable} from '../Dnd/Droppable';

export default function Selection(prop: any) {
    const latexString = "\\sigma_{name='Dupond'}( Student )"
    const [parent, setParent] = useState(null);

    // return (
    //     <DndContext onDragEnd={handleDragEnd}>
    //       {!parent ? draggable : null}
    //       <Droppable id="droppable">
    //         {parent === "droppable" ? draggable : 'Drop here'}
    //       </Droppable>
    //     </DndContext>
    //   );
    
      function handleDragEnd(over:any) {
        setParent(over ? over.id : null);
      }
    return (
        <DndContext onDragEnd={handleDragEnd}>
        <Droppable id="droppable">
            <div className="border-solid pointer-events-none select-none border-2 bg-[#F9e4db] border-sky-500  rounded-md w-100px min-h-100px p-4">
                <h1>Selection</h1>
                <MathJax.Provider>
                    <MathJax.Node formula={latexString} />
                </MathJax.Provider>
            </div>
            {'Drop here'}
        </Droppable>
        </DndContext>
    )
}
