import React, { useEffect, useState } from 'react';
import { WorkspaceSvg } from "blockly";
import { MathJax } from 'better-react-mathjax';
import { api } from 'src/assets/tools/ApiCenter';
import { config } from 'src/config';
import WorkspaceRelations from 'src/assets/classes/WorkspaceRelation';
import type { WsData } from 'src/assets/Types/WsData';
import CsvInput from '../Input/CsvInput';
import WsButtons from './WsButtons';
import WsDataArea from './WsDataArea';
import WsBlockArea from './WsBlockArea';
// import {serialize, add, resize, load, save, loadToWorkspace, create, init, getLatex } from 'src/assets/Helper/Workspace';
import { getLatex } from 'src/assets/Helper/Workspace/getLatex';
import { serialize } from 'src/assets/Helper/Workspace/Serialize';


export default function WsContent(prop: any) {
    // TODO : remove
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
    const [inputArray, setInputArray] = useState<WsData[]>([]);
    const [blockWorkspace, setBlockWorkspace] = useState<WorkspaceSvg>();
    const [demoLatex, setDemoLatex] = useState<string>('');
    const [firstLoad, setFirstLoad] = useState<boolean>(false);
    const [resultTable, setResultTable] = useState<WsData>({
        title: 'Result',
        data: dummyTableData,
        columnNames: dummyTableColumnNames,
        isShrinkable: false,
    });


    function updateCode() {
        if (blockWorkspace === undefined) {
            console.log("blockWorkspace doesn't exist");
            return;
        }
        const code = getLatex(blockWorkspace);

        // // afficher le code dans la zone d'affichage
        // if (code != null && code.length > 0) {
        //     setDemoLatex('$' + code + '$');
        // }
        // else if (code.length === 0) {
        //     setDemoLatex('');
        // }
    }


    function onresize(e: any) {
        const blocklyArea = document.getElementById('blocklyArea');
        const blocklyDiv = document.getElementById('blocklyDiv');
        if (!blocklyArea || !blocklyDiv) {
            console.log("blocklyArea or blocklyDiv doesn't exist");
            return;
        }
        if (blockWorkspace === undefined) {
            console.log("blockWorkspace doesn't exist");
            return;
        }
        // resize(blocklyArea, blocklyDiv, blockWorkspace)
    };

    function saveWorkspace(e: any) {
        if (prop.noSave === true) {
            console.log("Workspace can not be saved");
            return;
        }

        if (blockWorkspace === undefined) {
            console.log("blockWorkspace doesn't exist");
            return;
        }

        // /* ----------------------------- SAVE WORKSPACE ----------------------------- */
        // const state = serialize(blockWorkspace);
        // const data = {
        //     "workspace": JSON.stringify(state),
        //     "workspaceId": prop.id,
        //     "name": "Mon espace de travail"
        // }
        // api.patch(config.apiUrl + '/workspace/', data)
        //     .then((res) => {
        //         console.log("Workspace saved");
        //         // Change the button color to green then back to normal after 1 second
        //         var button = document.getElementById("saveButton");
        //         if (button === null || button === undefined) { return; }
        //         // Set the button color to green
        //         button.classList.add("bg-success");
        //         // Set the button color on hover to green
        //         button.classList.add("hover:bg-success");
        //         setTimeout(() => {
        //             if (button === null || button === undefined) { return; }
        //             // Set the button color to normal
        //             button.classList.remove("bg-success");
        //             // Set the button color on hover to normal
        //             button.classList.remove("hover:bg-success");
        //         }
        //             , 2000);
        //     })
        //     .catch((err) => {
        //         console.log("Workspace not saved");
        //         console.log(err);
        //     });
    }



    function saveRelations(e: any) {
        // return;
        if (prop.noSave === true) {
            console.log("Relations can not be saved");
            return;
        }

        if (blockWorkspace === undefined) {
            console.log("blockWorkspace doesn't exist");
            return;
        }

        // save(WorkspaceRelations.getTables(), prop.id, (res: any) => { console.log("Succes save relation") }, (err: any) => { console.log("Error save relation") });
    }

    useEffect(() => {
    //     // Si le workspace n'est pas défini, on le crée
        if (blockWorkspace === undefined) {
    //         create(setBlockWorkspace);
        } // fin si
        if (blockWorkspace !== undefined && !firstLoad) {
            setFirstLoad(true);
    //         init(blockWorkspace, updateCode, onresize);
            if (prop.id === null) {
                return;
            }
            
            if (prop.noLoad) {
                return;
            }
    //         load(blockWorkspace, prop.id);
    //         loadToWorkspace(prop.id, setInputArray);
        }


    }, [blockWorkspace, firstLoad]);



    function exec() {
        if (blockWorkspace === undefined) {
            console.log("blockWorkspace doesn't exist");
            return;
        }
        // const resultat = executeCode(blockWorkspace)
        // const data: WsData = {
        //     "title": "Result",
        //     "data": resultat.getData(),
        //     "columnNames": resultat.getColumnNames(),
        //     "isShrinkable": false
        // }
        // setResultTable(data);
    }

    function newTableau(text: string, name: string) {
        // add(text, name, inputArray, setInputArray);
    }


    return (
        <div>
            <WsBlockArea />
            <div>
                {/* Zone d'affichage du latex, zone ressemblant à une zone de code */}
                <div id="latexDiv" className='overflow-x-scroll bg-black rounded-md text-white'>
                    <MathJax dynamic id="latex">{demoLatex}</MathJax>
                </div>
            </div>
            <WsButtons saveWorkspace={saveWorkspace} saveRelations={saveRelations} exec={exec} noSave={prop.noSave} btnClass="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-500 ease-in-out" />

            {/* Zone d'ajout de fichier csv pour ajouter de nouveaux tableaux */}
            <div className='flex justify-center'>
                <div className='w-2/3'>
                    <CsvInput callBack={newTableau} />
                </div>
            </div>

            <WsDataArea inputArray={inputArray} resultTable={resultTable} />
        </div>
    );
}
