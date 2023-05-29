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
import WsContent from '../Workspace/WsContent';
import type { TWsData } from 'src/assets/Types/TWsData';
import rehypeRaw from 'rehype-raw';
/**
 * 
# Exercice de pseudo division
## Schema relationnel
- Pilote : (<u>idP</u>, nom, prenom, ville_naissance) 
- Avion : (<u>idA</u>, nbPlaces) 
- Vol : (<u>idP, idA</u>, ville_dep, ville_arr)

## Question
Quels sont les pilotes ayant volé tous les avions depuis leurs ville de naissance ?

## Rappel
C'est une pseudo division, il est donc important de se rappeler que le block de division de fonctionne pas pour cette requête.

![https://www.9raytifclick.com/wp-content/uploads/2021/10/division1.png](https://www.9raytifclick.com/wp-content/uploads/2021/10/division1.png)
 */

export function ExerciceLoader({ params }: any) {
    return params.exerciceId;
}
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
export function Exercice(prop: any) {
    const resultatRef = React.useRef<HTMLDivElement>(null);
    const titreRef = React.useRef<HTMLDivElement>(null);
    const workspaceRef = React.useRef<HTMLDivElement>(null);
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


    async function handleResponse(response: any) {
        const exercice = response.exercice;
        let resultat = null
        if (exercice.resultat !== null && exercice.resultat !== undefined) {
            resultat = JSON.parse(exercice.resultat.content);
        }
        const relations = exercice.relations;
        const titre = exercice.name;
        const markdownExo = exercice.enonce;
        let workspaceId = exercice.workspaceId;
        if (markdownParentRef.current !== null) {
            createRoot(markdownParentRef.current).render(
                <ReactMarkdown 
                    components={{ h1: "h2" }}  
                    rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }], [rehypeRaw]]}
                    remarkPlugins={[remarkGfm]}  
                    children={markdownExo} />
            );
        }
        if (resultatRef.current !== null && resultat !== null && resultat !== undefined) {
            createRoot(resultatRef.current).render(
                <Table data={resultat.data} columnNames={resultat.columnNames} title="Résultat attendu" isShrinkable={true} />
            );
        }
        if (titreRef.current !== null) {
            titreRef.current.innerHTML = titre;
        }
        if (workspaceId === null || workspaceId === undefined) {
            workspaceId = await createWorkspace(exercice.id);
        }
        if (workspaceRef.current !== null) {
            let relationExo : TWsData[] = relations.map((relation: any) => {
                return {
                    title: relation.name,
                    data: JSON.parse(relation.content).data,
                    columnNames: JSON.parse(relation.content).columnNames,
                    isShrinkable: true,
                }
            });

            createRoot(workspaceRef.current).render(
                <WsContent exerciceId={exercice.id} id={workspaceId} exerciceData={relationExo} noLoadData noSaveData noLoad={false} noSave={false} noImportData={true} />
            );
        }

    }

    async function createWorkspace(idexo: number) : Promise<number> {
        let promise = new Promise<number>((resolve, reject) => {
            api.post(config.apiUrl + '/workspace', { id_exercice:  idexo })
                .then((response) => {
                    resolve(response.response.id);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
        return promise;
    }

    async function getExercice() {
        const token = getCookie("token");
        if (token === undefined || token === null || token === "") {
            window.location.href = "/signin";
        }
        await sleep(500);
        api.get(config.apiUrl + '/exercice/' + exoId)
            .then((response) => {
                handleResponse(response.response);
            })
            .catch((error) => {
                console.log(error);
            });

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
            {/* <WsContent exerciceId={exoId} /> */}
            <div className="w-full" ref={workspaceRef}>
                <span className='loaderCard '></span>
            </div>
        </>
    )
}