import React, {useState} from 'react';
import { Projection } from "../../assets/classes/Projection";
import { Ensemble } from "../../assets/classes/Ensemble";
import {DndContext} from '@dnd-kit/core';
import {Draggable} from '../Dnd/Draggable';
import {Droppable} from '../Dnd/Droppable';


let c = ["id", "test"]
let e = new Ensemble("Etudiant")
let f = new Ensemble("Test")
let p = new Projection(c, e)

// let chmpRen = {
//     "id": "id2",
//     "test": "test2",
// }

// let ren = new RenommageClass(chmpRen, e)
// let dif = new Difference(ren,p)

// console.log(p.toLatex());

// console.log(dif.toLatex());
// console.log(dif.toJSON())




export default function Demo(prop: any) {
    let d : {id : String, parent: String}[] = []
    const [count, setCount] = useState(0);
    const [items, setItems] = useState(d);
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <DndContext onDragEnd={handleDragEnd}>
                <section className="py-16 w-full h-full">
                    <div className="flex flex-row w-full gap-5">
                        <div className="flex flex-col w-full border-2 gap-5 min-h-40 bg-primary">
                            <Droppable id="droppable-1" style={{width: "100%", height: "100%"}}>
                                <div className='p-10 h-full w-100'>
                                {items.map((item, index) => {
                                    if (items[index].parent === "droppable-1") {
                                        return (<Draggable key={index} id={index.toString()}>
                                            {item.id}
                                        </Draggable>);
                                    }
                                })}
                                </div>
                            </Droppable>
                        </div>
                        
                        <div className="w-full border-2 gap-5 min-h-40 bg-light">
                            <Droppable id="droppable-2" style={{width: "100%", height: "100%"}} >
                                <div className='p-10 h-full w-100'>
                                {items.map((item, index) => {
                                    if (items[index].parent  === "droppable-2") {
                                        return (<Draggable key={index} id={index.toString()}>
                                            {item.id}
                                        </Draggable>);
                                    }
                                })}
                                </div>
                            </Droppable>
                        </div>
                        <div className="w-full border-2 gap-5 min-h-40 bg-warning">
                            <Droppable id="droppable-3" style={{width: "100%", height: "100%"}}>
                                <div className='p-10 h-full w-100'>
                                {items.map((item, index) => {
                                    if (items[index].parent  === "droppable-3") {
                                        return (<Draggable key={index} id={index.toString()}>
                                            {item.id}
                                        </Draggable>);
                                    }
                                })}
                                </div>
                            </Droppable>
                        </div>
                    </div>
                </section>
            </DndContext>
            <button onClick={addItem}>Add item</button>
        </div>
    );
    function addItem() {
        setCount(count + 1);
        setItems(items => [...items, {id: "item " + count, parent: "droppable-1"}]);
    }
    
    function handleDragEnd(over: any) {
        if (over) {
            const idBlock = over.active.id;
            const idZone = over.over.id;
            setItems(items => {
                const newItems = [...items];
                newItems[idBlock] = {id: items[idBlock].id, parent: idZone};
                return newItems;
            });
            if (over.over.id === 'droppable-3') {
                console.log("suppression : " + idBlock)
                setItems(items => items.filter((item, index) => index !== parseInt(idBlock)));
            }
        }
    }
}
