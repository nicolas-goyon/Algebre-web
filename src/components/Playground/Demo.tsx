import React, { useState } from 'react';
import { DndContext, pointerWithin } from '@dnd-kit/core';
import { TrashIcon } from '@heroicons/react/24/outline'
import { Draggable } from '../Dnd/Draggable';
import { Droppable } from '../Dnd/Droppable';
import { Noeuds, NoeudsBase, NoeudsGet, Noeud } from '../../assets/classes/Noeuds';


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
type element = {id:number, type: Noeuds};
export default function Demo(prop: any) {
    let d : element[] = [];
    const [items, setItems] = useState(d); // items dans le drop 1
    const [count , setCount] = useState(0); // compteur pour les id
    let f : Noeud | null = null;
    const [racine, setRacine] = useState<Noeud | null>(f); // racine de l'arbre
    let tab : Noeud[] = [];
    const [tableau , setTableau] = useState(tab); // tableau des noeuds
    const dropListBase : String[] = [ "droppable-1", "droppable-2", "droppable-3"];

    console.log("Demo5")

    /* --------------------------------- Boutons -------------------------------- */
    const boutonIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
        </svg>
    )
    const boutons = [
        "Renommage",
        "Selection",
        "Ensemble"
    ];
    /* ------------------------------- FIN BOUTONS ------------------------------ */
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {/* --------------------------------- BOUTONS -------------------------------- */}
            <div className="flex flex-row gap-2">
                {boutons.map((bouton, index) => {
                    return (
                        <button onClick={addNoeud} datatype={bouton} id={index+""}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                        >
                            {boutonIcon}
                            {bouton}
                        </button>
                    )
                })}

            </div>
            {/* ------------------------------- FIN BOUTONS ------------------------------ */}



            {/* -------------------------------------------------------------------------- */}
            {/*                                 Playground                                 */}
            {/* -------------------------------------------------------------------------- */}

            <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin} >
                <section className="py-16 w-full h-full">
                    <div className="flex flex-row w-full gap-5">
                        {/* --------------------------------- Zone 1 --------------------------------- */}
                        <div className="flex flex-col w-full border-2 gap-5 min-h-40 bg-primary">
                            <Droppable id={dropListBase[0]} style={{width: "100%", height: "100%"}}>
                                <div className='p-10 h-full w-100'>
                                {items[0].map((item, index) => {
                                        return makeItem(0,index);
                                })}
                                </div>
                            </Droppable>
                        </div>
                        {/* ------------------------------- FIN Zone 1 ------------------------------ */}
                        
                        {/* --------------------------------- Zone 2 --------------------------------- */}
                        <div className="w-full border-2 gap-5 min-h-40 bg-light">
                            <Droppable id={dropListBase[1]} style={{width: "100%", height: "100%"}} >
                                <div className='p-10 h-full w-100'>
                                {items[1].map((item, index) => {
                                        return makeItem(0,index);
                                })}
                                </div>
                            </Droppable>
                           
                        </div>
                        {/* ------------------------------- FIN Zone 2 ------------------------------ */}
                        

                        {/* -------------------------------- Poubelle -------------------------------- */}
                        <div className="justify-end w-30 h-30">
                            <div className="gap-5 border-danger rounded-md border-2">
                                <Droppable id={dropListBase[2]} style={{width: "100%", height: "100%"}}>
                                    {/* Logo heroicon de taille 50 par 50 avec des bords rond en rouge (danger) */}
                                    <TrashIcon className="h-full w-full text-red-500" />
                                </Droppable>
                            </div>
                        </div>
                        {/* ------------------------------ FIN Poubelle ------------------------------ */}

                    </div>
                    
                </section>
                        
            </DndContext>
            {/* -------------------------------------------------------------------------- */}
            {/*                              FIN Playground                                */}
            {/* -------------------------------------------------------------------------- */}
            
        </div>
    );
    
    function makeItem(idDroppable: number, index: number): JSX.Element {
        const item = items[idDroppable][index];
        let block = item.type.component;
        let droppableZone = <div></div>;
        
        if( item.type != NoeudsBase.Ensemble) {
        
            let idDrop : String = "droppable-" + index + "-" + 1;
        
            droppableZone = (
                <Droppable id={idDrop} style={{width: "100%", height: "100%", backgroundColor:"grey"}}>
                    <div className='pl-4 py-3 w-100' style={{"minHeight": "3em"}} >
                        {/* faire en sorte que l'item soit draggable dans la zone de drop */}
                        {/* TODO */}
                        {
                        items[idDroppable].map((item, index) => {
                            return makeItem(idDroppable, index);
                        })
                        }
                    </div>
                </Droppable>
            );
        }

        // créer un item renommage et permet d'avoir une zone de drop dans l'item renommage
        return (
            <Draggable key={index} id={index.toString()} parent={idDroppable}>
                <div className="flex flex-col border-2 bg-light-50" style={{minWidth:"6em"}}>
                {block}

                {droppableZone}
                </div>
            </Draggable>
        );
    }

    // Fonction qui ajout un item dans la zone de drop 1
    function addNoeud(event: any) {
        // Récupérer le datatype du bouton cliqué
        const type : String = event.target.getAttribute("datatype");
        const newType = NoeudsGet.getNoeuds(type)

        // Ajouter un item dans la zone de drop 1   
        setItems(items => {
            let i = [...items];
            i[count] = {id: count, type: newType};
            return i;
        });
        setCount(count + 1);
    }
    
    function handleDragEnd(event: any) {
        const {over, active} = event;
        if (event) {
            const idBlock = active.id;
            const blockParent = active.parent;
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
            // Ajout de l'item dans la zone de drop
            setItems(items => {
                let i = [...items];
                for(let j = 0; j < items.length; j++){
                    if(j == idZone){
                        i[j] = [...items[j], {id: idBlock, type: items[blockParent][idBlock].type}];
                    }
                    if(j == blockParent){
                        i[j] = [...items[j].slice(0, idBlock), ...items[j].slice(parseInt(idBlock) + 1)];
                    }
                    else
                        i[j] = [...items[j]];
                }
                return i;
            });


            if (over.id === 'droppable-3') {
                console.log("suppression : " + idBlock)
                // TODO : Suppression de l'item et suppression des zones de drop correspondant aux enfants de façon récursive
            }
        }
    }

    // Fonction qui compte le nombre d'item dans une zone de drop
    function countItem(id: number) {
        return items[id].length;
    }


}
