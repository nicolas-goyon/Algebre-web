// Application d'exemple de drag and drop avec 3 zone de drop et 1 bouton pour ajouter un élément
// première zone de drop : zone où l'élément ajouté est placé
// deuxième zone de drop : zone les éléments de la première zone de drop peuvent être déplacés
// troisième zone de drop : zone où les éléments sont supprimés

import React, {useState, useEffect} from 'react';
import {DndContext} from '@dnd-kit/core';
import {Draggable} from '../components/Dnd/Draggable';
import {Droppable} from '../components/Dnd/Droppable';
let count = 0;
let itemsTab : JSX.Element[] = [];

export default function App() {
    let d : String[] = []
    let dZone :String[]  = []
    const [items, setItems] = useState(d);
    const [parents, setParents] = useState(dZone);
    useEffect(() => {
        majItemsTab();
        // console.log("items :");
        // console.info(items);
        // console.log("parents :");
        // console.info(parents);
      }, [items, parents, setItems, setParents]);
    majItemsTab();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <DndContext onDragEnd={handleDragEnd}>
            
            
          

    <section className="py-16 w-full h-full">
        <div className="flex flex-row w-full gap-5">
            <div className="flex flex-col w-full border-2 gap-5 min-h-40 p-10 bg-primary">
                <Droppable id="droppable-1" style={{width: "100%", height: "100%"}}>
                    {itemsTab.map((item, index) => {
                        if (parents[index] === "droppable-1") {
                            return item;
                        }
                    })}
                </Droppable>
            </div>
            
            <div className="w-full border-2 h-40 bg-light">
                <Droppable id="droppable-2" style={{width: "100%", height: "100%"}} >
                    {itemsTab.map((item, index) => {
                        if (parents[index] === "droppable-2") {
                            return item;
                        }
                    })}
                </Droppable>
            </div>
            <div className="w-full border-2 h-40 bg-warning">
                <Droppable id="droppable-3" style={{width: "100%", height: "100%"}}>
                    {itemsTab.map((item, index) => {
                        if (parents[index] === "droppable-3") {
                            return item;
                        }
                    })}
                </Droppable>
            </div>
        </div>
    </section>


        </DndContext>
        <button onClick={addItem}>Add item</button>
        <DndContext>
            <Draggable />
            <Droppable />
        </DndContext>
        </div>
    );

    function addItem() {
        count++;
        setItems(items => [...items, 'Item'+count]);
        setParents(parents => [...parents, 'droppable-1']);
    }

    function majItemsTab() {
        itemsTab = items.map((item, index) => (
            <Draggable key={index} id={index}>
                {item}
            </Draggable>
        ))
    }
    
    function handleDragEnd(over: any) {
        if (over) {
            const idBlock = over.active.id;
            const idZone = over.over.id;
            setParents(parents => {
                const newParents = [...parents];
                newParents[idBlock] = idZone;
                return newParents;
            });
            if (over.over.id === 'droppable-3') {
                console.log("suppression : " + idBlock)
                items.splice(idBlock, 1);
                setItems(items);
                parents.splice(idBlock, 1);
                setParents(parents);
            }
        }
    }
}
