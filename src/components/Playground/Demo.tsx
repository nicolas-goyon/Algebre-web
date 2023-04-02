import React, {useEffect, useState} from 'react';
// import { Projection } from "../../assets/classes/Projection";
// import { Ensemble } from "../../assets/classes/Ensemble";
import {DndContext, pointerWithin} from '@dnd-kit/core';
import { TrashIcon } from '@heroicons/react/24/outline'
import {Draggable} from '../Dnd/Draggable';
import {Droppable} from '../Dnd/Droppable';
import Renommage from './Renommage';
import Selection from './Selection';
import Ensemble from './Ensemble';
import {Noeuds, NoeudsGet} from '../../assets/classes/Noeuds';


// let c = ["id", "test"]
// let e = new Ensemble("Etudiant")
// let f = new Ensemble("Test")
// let p = new Projection(c, e)

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
    let d : {id : String, parent: String, type: Noeuds}[] = []
    
    const [count, setCount] = useState(0);
    const [items, setItems] = useState(d);
    let dropListBase : String[] = [ "droppable-1", "droppable-2", "droppable-3"];
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-row gap-2">
                <button onClick={addNoeud} datatype='Renommage'
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                    Renommage
                </button>
                <button onClick={addNoeud} datatype='Selection'
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                    Selection
                </button>
                <button onClick={addNoeud} datatype='Ensemble'
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                    Ensemble
                </button>
            </div>

            <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin} >
                <section className="py-16 w-full h-full">
                    <div className="flex flex-row w-full gap-5">
                        <div className="flex flex-col w-full border-2 gap-5 min-h-40 bg-primary">
                            <Droppable id={dropListBase[0]} style={{width: "100%", height: "100%"}}>
                                <div className='p-10 h-full w-100'>
                                {items.map((item, index) => {
                                    if (items[index].parent === "droppable-1") {
                                        return makeItem(index);
                                    }
                                })}
                                </div>
                            </Droppable>
                        </div>
                        
                        <div className="w-full border-2 gap-5 min-h-40 bg-light">
                            <Droppable id={dropListBase[1]} style={{width: "100%", height: "100%"}} >
                                <div className='p-10 h-full w-100'>
                                {items.map((item, index) => {
                                    if (items[index].parent  === "droppable-2") {
                                        return makeItem(index);
                                    }
                                })}
                                </div>
                            </Droppable>
                           
                        </div>
                        <div className="justify-end w-30 h-30">
                            <div className="gap-5 border-danger rounded-md border-2">
                                <Droppable id={dropListBase[2]} style={{width: "100%", height: "100%"}}>
                                    {/* Logo heroicon de taille 50 par 50 avec des bords rond en rouge (danger) */}
                                    <TrashIcon className="h-full w-full text-red-500" />
                                    
                                </Droppable>
                            
                                
                            </div>
                        </div>
                    </div>
                    
                </section>
                        
            </DndContext>
            
        </div>
    );
    
    function makeItem(index: number): JSX.Element {
        
        let idDrop : String = "";
        if( items[index].type != Noeuds.Ensemble) {
            idDrop = "droppable-" + index + "-" + 1;
        }
        let block = NoeudsGet.getJSXElement(items[index].type);

        let droppableZone = <div></div>;
        if(items[index].type != Noeuds.Ensemble) {
            droppableZone = (
                <Droppable id={idDrop} style={{width: "100%", height: "100%", backgroundColor:"grey"}}>
                    <div className='pl-4 py-3 w-100' style={{"minHeight": "3em"}} >
                        {/* faire en sorte que l'item soit draggable dans la zone de drop */}
                        {items.map((item, index2) => {
                            if (items[index2].parent === idDrop) {
                                return makeItem(index2);
                            }
                        })}

                    </div>
                </Droppable>
            );
        }

        
        
        // créer un item renommage et permet d'avoir une zone de drop dans l'item renommage
        return (
            <Draggable key={index} id={index.toString()}>
                <div className="flex flex-col border-2 bg-light-50" style={{minWidth:"6em"}}>
                {block}

                {droppableZone}
                </div>
            </Draggable>
        );
    }

    function addNoeud(event: any) {
        // Récupérer le datatype du bouton cliqué
        const type = event.target.getAttribute("datatype");
        const newType = NoeudsGet.getNoeuds(type)

        setCount(count + 1);
        setItems(items => [...items, {id: "item " + count, parent: "droppable-1", type: newType}]);
    }

    function addRenommage() {
        setCount(count + 1);
        setItems(items => [...items, {id: "item " + count, parent: "droppable-1", type: Noeuds.Renommage}]);
    }
    function addSelection() {
        setCount(count + 1);
        setItems(items => [...items, {id: "item " + count, parent: "droppable-1", type: Noeuds.Selection}]);
    }

    function addEnsemble(){
        setCount(count + 1);
        setItems(items => [...items, {id: "item " + count, parent: "droppable-1", type: Noeuds.Ensemble}]);
    }
    
    function handleDragEnd(event: any) {
        const {over, active} = event;
        if (event) {
            const idBlock = active.id;
            const idZone = over.id;
            
            if (!dropListBase.includes(over.id)) {
                // Compter le nombre d'item dans la zone de drop
                let count = countItem(idZone);
                // Si il y a plus de 1 item dans la zone de drop alors on ne peut pas déposer l'item
                // Vérifier que la zone ciblé n'est pas lui même
                const drop = idZone;
                const idParent = drop.split("-")[1]; // droppable-1-1 => droppable 1 2 

                console.log("idParent : " + idParent + " idBlock : " + idBlock)
                
                if (count > 0 || idParent == idBlock) {
                    return;
                }
            }

            setItems(items => {
                const newItems = [...items];
                newItems[idBlock] = {id: items[idBlock].id, parent: idZone, type: items[idBlock].type};
                return newItems;
            });
            if (over.id === 'droppable-3') {
                console.log("suppression : " + idBlock)
                setItems(items => items.filter((item, index) => index !== parseInt(idBlock)));
            }
        }
    }

    // Fonction qui compte le nombre d'item dans une zone de drop
    function countItem(id: String) {
        return searchItem(id).length;
    }

    // Fonction qui permet de chercher un item dans une zone de drop
    function searchItem(id: String) {
        let itemList:{id:String, parent:String}[] = [];
        items.map((item, index) => {
            if (items[index].parent === id) {
                itemList.push(items[index]);
            }
        })
        return itemList;
    }
}
