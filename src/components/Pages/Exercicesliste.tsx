import React from 'react'


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
                    <div className="w-full m-h-10 bg-white rounded-lg shadow-lg align-middle cursor-pointer hover:border-black hover:border-3 hover:shadow-xl" onClick={ () => (console.log("click : " + index)) }>
                        <div className="flex flex-row justify-start">
                            <div className="border-r-2 border-gray-300 p-3">
                                <h1 className="text-5xl font-mono">
                                    #{index}
                                </h1>
                            </div>
                            <div className="w-1/2 m-h-10 my-auto ml-4">    
                                <p className="text-xl font-mono">
                                    {item}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}