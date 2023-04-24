import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props: any) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 0.5: 1,
    
  };
  // ajouter le style de props.style dans style
  if (props.style) {
    Object.assign(style, props.style);
  }


  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}