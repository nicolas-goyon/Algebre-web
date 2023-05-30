import React, { useEffect, useState } from 'react'
import ListTitle from '../Utils/ListTitle'
import { api } from 'src/assets/tools/ApiCenter'
import { config } from 'src/config'
import Title from '../Utils/Title'


export function Exerciceliste(): JSX.Element {
    const data = [
        { id: 1, title: 'Exercice 1' },
        { id: 2, title: 'Exercice 2' },
        { id: 3, title: 'Exercice 3' },
        { id: 4, title: 'Exercice 4' }
    ]

    const [exercices, setExercices] = useState(data)

    useEffect(() => {
        api.get(config.apiUrl + '/exercice')
            .then((res) => {
                if (res.status === 200 && res.response != null) {
                    const newDatas = res.response.exercices.map((item: any) => {
                        return { id: item.id, title: item.name }
                    })
                    setExercices(newDatas)
                }
            })
            .catch((err) => {
                alert(err)
            })
    }, [])

    // function deleteHandler(id: number) {
    //     api.delete(config.apiUrl + '/exercice/' + id, null)
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 const newDatas = exercices.filter((item) => item.id !== id)
    //                 setExercices(newDatas)
    //             }
    //         })
    //         .catch((err) => {
    //             alert(err)
    //         })
    // }


    {/* deleteHandler={(e: any) => {e.preventDefault(); e.stopPropagation(); deleteHandler(item.id)}} */ }
    return (

        <>
            <Title title="Exercices" />
            {/* Affichage d'un bouton pour créer un nouvel espace */}
            <div className="flex justify-center pb-10">
                <a href="/createExercice" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700">
                    Créer un nouvel exercice
                </a>
            </div>

            {/* Affichage des différents workspaces avec une liste */}
            <div className="flex flex-wrap justify-center gap-4">
                {exercices.map((item) => (
                    <ListTitle id={item.id} title={item.title} handler={() => (window.location.href = '/exercice/' + item.id)}/>
                ))}
            </div>
        </>
    )
}