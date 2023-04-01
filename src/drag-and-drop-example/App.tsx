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
let dZone :String[]  = []

export default function App() {
    let d : String[] = [""]
    const [items, setItems] = useState(d);
    const [parent, setParent] = useState(null);
    useEffect(() => {
        majItemsTab();
      });


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <DndContext onDragEnd={handleDragEnd}>
            
            
          

    <section className="py-16 w-full h-full">
        <div className="flex flex-row w-full gap-5">
            <div className="flex flex-col w-full border-2 gap-5 min-h-40 p-10 bg-primary">
                <Droppable id="droppable-1" style={{width: "100%", height: "100%"}}>
                    {/* pour chaque element de ItemsTab, on vérifie s'il est dans la zone 1 et on l'affiche */}
                    {itemsTab.map((item, index) => {
                        if (dZone[index] === "droppable-1") {
                            return item;
                        }
                    })}
                </Droppable>
            </div>
            
            <div className="w-full border-2 h-40 bg-light">
                <Droppable id="droppable-2" style={{width: "100%", height: "100%"}} >
                    {/* {parent === "droppable-2" ? (
                        <Draggable id={items.length}>{items[items.length - 1]}</Draggable>
                    ) : (
                        'Drop here'
                    )} */}
                    {itemsTab.map((item, index) => {
                        if (dZone[index] === "droppable-2") {
                            return item;
                        }
                    })}
                </Droppable>
            </div>
            <div className="w-full border-2 h-40 bg-warning">
                <Droppable id="droppable-3" style={{width: "100%", height: "100%"}}>
                    {/* Div qui est une zone dropable de taille fixe 100 par 100 où les element s'y dépose avec des classes tailwind */}
                    {/* {parent === "droppable-3" ? (
                        <Draggable id={items.length}>{items[items.length - 1]}</Draggable>
                    ) : (
                        'Drop here'
                    )} */}
                    {itemsTab.map((item, index) => {
                        if (dZone[index] === "droppable-3") {
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
        dZone.push("droppable-1");
        console.log(items);
        console.log(dZone);
    }

    function majItemsTab() {
        itemsTab = items.map((item, index) => (
            <Draggable key={index} id={index}>
                {item}
            </Draggable>
        ))
    }
    
    function handleDragEnd(over: any) {
        let supp = false;
        if (over) {
            // console.info(over)
            // console.info(over.over)
            // // information sur l'élément qui a été déplacé
            // console.info(over.active)
            // console.info(over.active.id)
            const idBlock = over.active.id;
            const idZone = over.over.id;
            
            dZone[idBlock] = idZone;
            majItemsTab();
            if (over.over.id === 'droppable-1') {
                // setItems(items.filter((_, index) => index !== items.length - 1)); 
            } else if (over.over.id === 'droppable-3') {
                supp = true;
                console.log("suppression :" + idBlock)
                // setItems(items.slice(0, items.length - 1)); // remove last item
                setItems(items.splice(idBlock-1, 1));
                dZone.splice(idBlock-1, 1);
            }
        }
        if (!supp) {
            setParent(over ? over.over.id : null);
        }
    }
}
