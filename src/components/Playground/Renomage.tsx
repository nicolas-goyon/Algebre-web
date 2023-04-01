import React, { useState } from 'react';
import MathJax from 'react-mathjax';
import {DndContext} from '@dnd-kit/core';
import {Draggable} from '../Dnd/Draggable';
import {Droppable} from '../Dnd/Droppable';


export default function Renommage(prop: any) {
  const latexString = "\\rho_{name}( Student )";

    const content = (
      <div className="border-solid pointer-events-none select-none border-2 bg-[#F9e4db] border-sky-500  rounded-md w-100px min-h-100px p-4">
          <h1>Renommage</h1>
          <MathJax.Provider>
              <MathJax.Node formula={latexString} />
          </MathJax.Provider>
      </div>
    );


    const [parent, setParent] = useState(null);

    const draggable = (
      <Draggable id="draggable">
        {content}
      </Draggable>
    );

    // return (
    //     <div className="border-solid pointer-events-none select-none border-2 bg-[#F9e4db] border-sky-500  rounded-md w-100px min-h-100px p-4">
    //         <h1>Renommage</h1>
    //         <MathJax.Provider>
    //             <MathJax.Node formula={latexString} />
    //         </MathJax.Provider>
    //     </div>
    // )

    return (
        <DndContext onDragEnd={handleDragEnd}>
          {!parent ? draggable : null}
          <Droppable id="droppable">
            {parent === "droppable" ? draggable : 'Drop here'}
          </Droppable>
        </DndContext>
      );
    
      function handleDragEnd(over:any) {
        setParent(over ? over.id : null);
      }
}