import React from 'react'
import Table from '../Utils/Table';


export default function Exercicedemo() : JSX.Element {
    const dummyTableColumnNames = [
        "Nom",
        "Prénom",
        "Age",
    ];

    const dummyTableData = [
        { Nom: "Doe", Prénom: "John", Age: "42" },
        { Nom: "Doe", Prénom: "Jane", Age: "43" },
        { Nom: "Dark", Prénom: "John", Age: "32" },
        { Nom: "Dark", Prénom: "Jane", Age: "33" },
        { Nom: "Lenon", Prénom: "John", Age: "22" },
    ];
    // const token = getCookie("token");
    // if (token === undefined || token === null || token === ""){
    //     window.location.href = "/signin";
    //     return <div></div>;
    // }
    return (
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-light">
            {/* Zone de description de l'exercice, Titre en une ligne en haut, puis un div séparé en deux, à gauche un ennoncé, à droite le tableau de data attendu */}
            <div className="flex flex-col">
                <div className="flex flex-row">
                    {/* Titre */}
                    <h1 className="text-4xl font-mono">
                        Exercice 1
                    </h1>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-row">
                            {/* Div ennonce  */}
                            <div className="bg-gray-200 p-4 w-2/3">
                                <p className="text-lg text-gray-800">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu leo in justo sollicitudin iaculis. Donec maximus mi ut faucibus consectetur. Sed consectetur tellus quis urna aliquam, id condimentum elit tincidunt. Integer auctor lacus et velit iaculis, vel eleifend libero consectetur. Sed non fermentum arcu. Nunc euismod leo felis, a eleifend arcu ullamcorper in. Proin convallis consequat libero ac tempus. Mauris eu ex vitae nisl vulputate lobortis a nec purus.
                                </p>
                            </div>
                            {/* Div resultat attendu */}
                            <div className="bg-gray-100 p-4 w-1/3">
                                <Table columnNames={dummyTableColumnNames} data={dummyTableData} title={"Résultat attendu"} isShrinkable={true}/>
                            </div>

                    </div>
                </div>
            </div>
            {/* Zone de code */}
            <div className="flex flex-col h-56 bg-dark">

            </div>
        </div>
    )
}