import React from 'react'
import ListTitle from '../Utils/ListTitle'


export default function Exerciceliste() : JSX.Element {
    const data = [
        "Exercice 1",
        "Exercice 2",
        "Exercice 3",
        "Exercice 4",
    ]
    return (
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-light">
            {/* Affichage de la liste des exercices */}
            <div id="WorkspaceList" className="flex flex-wrap justify-center gap-4">
                {data.map((item, index) => (
                    <ListTitle id={index} title={item} handler={()=>(window.location.href = '/exercices/'+index)}/>
                ))}
            </div>
        </div>
    )
}