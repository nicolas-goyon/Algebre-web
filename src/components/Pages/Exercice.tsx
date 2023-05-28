import React, { useEffect } from 'react'
import Table from '../Utils/Table';
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css/github-markdown-light.css'
import { getCookie } from 'src/assets/tools/Utils';
import { config } from 'src/config';
import { api } from 'src/assets/tools/ApiCenter';
import { useLoaderData } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import 'src/assets/CSS/loaders.css'

export function ExerciceLoader({ params }: any) {
    return params.exerciceId;
}
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
export function Exercice(prop: any) {
    const resultatRef = React.useRef<HTMLDivElement>(null);
    const titreRef = React.useRef<HTMLDivElement>(null);
    const [markdown, setMarkdown] = React.useState<string>("");
    const markdownParentRef = React.useRef<HTMLDivElement>(null);
    const exoId = useLoaderData();



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

    async function getExercice() {
        const token = getCookie("token");
        if (token === undefined || token === null || token === "") {
            window.location.href = "/signin";
        }
        await sleep(500);
        api.get(config.apiUrl + '/exercice/' + exoId)
            .then((response) => {
                const exercice = response.response.exercice;
                const resultat = (exercice.relations !== undefined && exercice.relations.length > 0 ? JSON.parse(exercice.relations[0].content) : null)
                const titre = exercice.name;
                const markdownExo = exercice.enonce;
                if (markdownParentRef.current !== null) {
                    createRoot(markdownParentRef.current).render(
                        <ReactMarkdown components={{ h1: "h2" }} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} children={markdownExo} />
                    );
                } 
                if (resultatRef.current !== null && resultat !== null) {
                    createRoot(resultatRef.current).render(
                        <Table data={resultat.data} columnNames={resultat.columnNames} title="Résultat attendu" isShrinkable={true} />
                    );
                }
                if (titreRef.current !== null) {
                    titreRef.current.innerHTML = titre;
                }

            })
            .catch((error) => {
                console.log(error);
            });
        // TODO : vérfier si un ws est en cours pour cet exercice
    }

    useEffect(() => {
        getExercice();
    }, []);
    const token = getCookie("token");
    if (token === undefined || token === null || token === "") {
        window.location.href = "/signin";
        return <div></div>;
    }

    return (
        <>
            {/* Zone de description de l'exercice, Titre en une ligne en haut, puis un div séparé en deux, à gauche un ennoncé, à droite le tableau de data attendu */}
            <div className="flex flex-col">
                <div className="flex flex-row w-full">
                    {/* Titre */}
                    <h1 className="text-4xl font-mono" ref={titreRef}>
                        <span className='loaderLinear'></span>
                    </h1>

                </div>
                <div className="flex flex-row w-full">
                    <div className="flex flex-row w-full">
                        {/* Div ennonce  */}
                        <div className="p-4 w-2/3 markdown-body" ref={markdownParentRef} >
                            <div className="flex flex-row justify-center items-center h-full">
                                <span className='loaderGlobe' style={{ marginTop: '30px', marginBottom: '30px' }}></span>
                            </div>
                        </div>

                        {/* Div resultat attendu */}
                        <div className="bg-gray-100 p-4 w-1/3" ref={resultatRef}>
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