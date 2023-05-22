import React from 'react'
import ListTitle from '../Utils/ListTitle'


export function Exerciceliste(): JSX.Element {
    const data = [
        "Exercice 1",
        "Exercice 2",
        "Exercice 3",
        "Exercice 4",
    ]
    return (
        <div id="WorkspaceList" className="flex flex-wrap justify-center gap-4">
            {data.map((item, index) => (
                <ListTitle id={index} title={item} handler={() => (window.location.href = '/exercices/' + index)} />
            ))}
        </div>
    )
}