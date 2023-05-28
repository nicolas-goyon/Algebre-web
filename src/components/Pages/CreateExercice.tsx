import React, { useEffect, useState, useRef } from 'react'
import { getCookie } from 'src/assets/tools/Utils';
import 'github-markdown-css/github-markdown-light.css'
import Title from '../Utils/Title';
import CsvInput from '../Input/CsvInput';
import MarkdownInput from '../Input/MarkdownInput';
import { TWsData } from 'src/assets/Types/TWsData';
import Relation from 'src/assets/classes/Relation';
import { extractTableau } from 'src/assets/Helper/addTableau';
import Table from '../Utils/Table';
import { api } from 'src/assets/tools/ApiCenter';
import { config } from 'src/config';


export function CreateExercice() {
    const [relations, setRelations] = useState<TWsData[]>([]);
    const sumbitRef = useRef<HTMLButtonElement>(null);
    const formRef = useRef<HTMLFormElement>(null);


    function addTab(text: string, name: string) {
        const newData = extractTableau(text, name);
        if (newData === null) {
            return;
        }
        setRelations((prevRelations) => [...prevRelations, newData]);
        // console.log(newRelations);
    }

    function testSubmit(e: any) {
        e.preventDefault();
        console.log("testSubmit");
        console.log(relations);
    }


    function handleSubmit(e: any) {
        // console.log(relations)
        e.preventDefault();

        const inputArea = document.getElementById('inputArea') as HTMLDivElement;
        if (!inputArea) {
            console.log("inputArea doesn't exist");
            return;
        }
        const description = document.getElementById('MarkdownInput') as HTMLTextAreaElement;
        if (!description) {
            console.log("description doesn't exist");
            return;
        }
        const name = document.getElementById('grid-name') as HTMLInputElement;
        if (!name) {
            console.log("name doesn't exist");
            return;
        }
        const dataRelation: { content: string, name: string }[] = [];
        const tables = [...relations]
        for (let i = 0; i < tables.length; i++) {
            const relation = tables[i];
            dataRelation.push({ content: JSON.stringify(relation), name: relation.title });
        }
        console.log(dataRelation);

        const requestBody = {
            name: name.value,
            description: description.value,
            relations: dataRelation,
        }
        // console.log("request api");
        api.post(config.apiUrl + '/exercice', requestBody)
            .then((response) => {
                console.log(response);
                window.location.href = "/exercice/" + response.response.id;
            }
            ).catch((error) => {
                console.log(error);
            }
            );
    }





    return (
        <>
            <Title title="Créer un exercice" />
            <div className="flex justify-center pb-10">
                <form className="w-full" ref={formRef}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-name">
                                Nom de l'exercice
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="grid-name" type="text" placeholder="Nom de l'exercice" />
                            <p className="text-gray-600 text-xs italic">Donnez un nom à votre exercice</p>

                            <hr className="my-5" />

                            <MarkdownInput inputId="MarkdownInput" />

                            <hr className="my-5" />

                            <div className="flex flex-row justify-between">
                                <div>
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-ressources">
                                        Ressources de l'exercice
                                    </label>
                                    <p className="text-gray-600 text-xs italic">Donnez les ressources de votre exercice</p>
                                    <CsvInput callBack={addTab} />
                                    <div id="dataArea" className='flex justify-center'>
                                        <div id="inputArea" className='w-2/3'>
                                            {relations.map((input, index) => (
                                                <Table key={index} columnNames={input.columnNames} data={input.data} title={input.title} isShrinkable={input.isShrinkable} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
                                Créer l'exercice
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}