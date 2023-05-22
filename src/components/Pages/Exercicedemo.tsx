import React from 'react'
import Table from '../Utils/Table';
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css/github-markdown-light.css'


export function Exercicedemo(): JSX.Element {
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
    const markdown = `
# Exercice 1 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu leo in justo sollicitudin iaculis. Donec maximus mi ut faucibus consectetur. Sed consectetur tellus quis urna aliquam, id condimentum elit tincidunt. Integer auctor lacus et velit iaculis, vel eleifend libero consectetur. Sed non fermentum arcu. Nunc euismod leo felis, a eleifend arcu ullamcorper in. Proin convallis consequat libero ac tempus. Mauris eu ex vitae nisl vulputate lobortis a nec purus.
Example markdown:
\`\`\`js
const markdown = "Hello World";
\`\`\``;
    return (
        <>
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
                        <div className="bg-gray-200 p-4 w-2/3 markdown-body">
                            <ReactMarkdown components={{ h1: "h2" }} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} children={markdown} />
                        </div>

                        {/* Div resultat attendu */}
                        <div className="bg-gray-100 p-4 w-1/3">
                            <Table columnNames={dummyTableColumnNames} data={dummyTableData} title={"Résultat attendu"} isShrinkable={true} />
                        </div>

                    </div>
                </div>
            </div>
            {/* Zone de code */}
            <div className="flex flex-col h-56 bg-dark">
                {/* Texte centré et gros */}
                <div className="flex flex-row justify-center items-center h-full">
                    <h1 className="text-4xl font-mono text-light">
                        TBA
                    </h1>
                </div>
            </div>
        </>
    )
}