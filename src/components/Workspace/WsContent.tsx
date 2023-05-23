import React, { useEffect, useState } from 'react';
import { inject } from "blockly";
import { MathJax } from 'better-react-mathjax';
import Relation from '../../assets/classes/Relation';
import { api } from '../../assets/tools/ApiCenter';
import { config } from '../../config';
import csvReader from '../../assets/tools/CsvUtils';
import WorkspaceRelations from '../../assets/classes/WorkspaceRelation';
import WsCommands from './WsCommands';
import WsData from './WsData';
import type { TWsData } from '../../assets/classes/TWsData';
import WsBlockly from './WsBlockly';


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
    const [inputArray, setInputArray] = useState<TWsData[]>([]);
    const [demoLatex, setDemoLatex] = useState<string>('');
    const [firstLoad, setFirstLoad] = useState<boolean>(false);
    const [resultTable, setResultTable] = useState<TWsData>({
        title: 'Result',
        data: dummyTableData,
        columnNames: dummyTableColumnNames,
        isShrinkable: false,
    });
    var blocklyDivStyle = { height: 600, width: '100%' }






    function saveWorkspace(e: any) {
        if (prop.noSave === true) {
            console.log("Workspace can not be saved");
            return;
        }
        // TODO : get the workspace serialized from the workspace component
        const data = {
            "workspace": JSON.stringify(state),
            "workspaceId": prop.id,
            "name": "Mon espace de travail"
        }
        api.patch(config.apiUrl + '/workspace/', data)
            .then((res) => {
                console.log("Workspace saved");
                // Change the button color to green then back to normal after 1 second
                var button = document.getElementById("saveButton");
                if (button === null || button === undefined) { return; }
                // Set the button color to green
                button.classList.add("bg-success");
                // Set the button color on hover to green
                button.classList.add("hover:bg-success");
                setTimeout(() => {
                    if (button === null || button === undefined) { return; }
                    // Set the button color to normal
                    button.classList.remove("bg-success");
                    // Set the button color on hover to normal
                    button.classList.remove("hover:bg-success");
                }
                    , 2000);
            })
            .catch((err) => {
                console.log("Workspace not saved");
                console.log(err);
            });
    }

    function loadWorkspace(id: number | null) {
        if (prop.noLoad) {
            return;
        }

        // Request api to load the workspace
        api.get(config.apiUrl + '/workspace/' + id)
            .then((res) => {
                if (res.status !== 200) {
                    return;
                }

                // load the workspace from JSON format
                let state = JSON.parse(res.response.workspace);
                // TODO : load the workspace component
                console.log("Workspace loaded");
            })
            .catch((err) => {
                console.log("Workspace not loaded");
                console.log(err);
            });
    }


    function saveRelations(e: any) {
        if (prop.noSave === true) {
            console.log("Relations can not be saved");
            return;
        }

        /* ----------------------------- SAVE RELATIONS ----------------------------- */
        const relations = WorkspaceRelations.getTables();
        relations.forEach((relation: Relation) => {
            const data = {
                "id": prop.id,
                "content": JSON.stringify(relation),
                "name": relation.name
            }
            api.patch(config.apiUrl + '/relation/', data)
                .then((res) => {
                    console.log("Relation saved for " + relation.name + " table");
                })
                .catch((err) => {
                    console.log("Relation not saved");
                    console.log(err);
                });
        });
    }

    function loadRelations(id: number | null) {
        if (prop.noLoad) {
            return;
        }

        // Request api to load the relations
        api.get(config.apiUrl + '/relation/' + id)
            .then((res) => {
                if (res.status !== 200) {
                    return;
                }
                let newInputArray: any[] = [];
                WorkspaceRelations.clearInstance();
                const relations = res.response.relations
                relations.forEach((relation: any) => {
                    console.log(relation);
                    const relationParse = JSON.parse(relation.content);
                    const headers = relationParse.columnNames;
                    const name = relation.name;
                    const data = relationParse.data

                    const newRelation = new Relation(name, data, headers);
                    WorkspaceRelations.addTable(newRelation);

                    const myData = {
                        title: name,
                        data: newRelation.getData(),
                        columnNames: newRelation.getColumnNames(),
                        isShrinkable: true,
                    }

                    newInputArray.push(myData);
                });
                setInputArray(newInputArray);
            })
            .catch((err) => {
                console.log("Relations not loaded");
                console.log(err);
            });
    }





    function addTableau(text: string, name: string) {
        // TODO : Check if name is already used
        let [headers, tableau] = csvReader(text);
        if (tableau === null || tableau === undefined || headers === null || headers === undefined) {
            return;
        }

        const inputArea = document.getElementById('inputArea');
        if (!inputArea) {
            console.log("inputArea doesn't exist");
            return;
        }
        const dataRelation: any[] = [];
        for (let i = 0; i < tableau.length; i++) {
            const row = tableau[i];
            const newRow: any = {};
            for (let j = 0; j < headers.length; j++) {
                const header = headers[j];
                newRow[header] = row[j];
            }
            dataRelation.push(newRow);
        }
        console.log(dataRelation);
        const newRelation = new Relation(name, dataRelation, headers);
        WorkspaceRelations.addTable(newRelation);


        const myData = {
            title: name,
            data: newRelation.getData(),
            columnNames: newRelation.getColumnNames(),
            isShrinkable: true,
        }

        setInputArray(inputArray => [...inputArray, myData]);
    }

    function executeCode() {
        // TODO : get the javascript code from the workspace component
        executeAlgebra(code);
        // setResult(result => code);
    }
    function executeAlgebra(code: string) {
        console.log("Execute Algebra Start");
        try {
            const cleanCode = transpile(code);
            const resultat: Relation = Function('WorkspaceRelations', 'return ' + cleanCode)(WorkspaceRelations);
            console.log(resultat.getData());
            setResultTable(resultTable => {
                let res = {
                    title: "Resultat",
                    data: resultat.getData(),
                    columnNames: resultat.getColumnNames(),
                    isShrinkable: true,
                }
                return res;
            })
            return resultat;
        } catch (error) {
            alert(error);
        }
        console.log("Execute Algebra End");
    }


    return (
        <div>
            <WsBlockly  />
            <div>
                {/* Zone d'affichage du latex, zone ressemblant à une zone de code */}
                <div id="latexDiv" className='overflow-x-scroll bg-black rounded-md text-white'>
                    <MathJax dynamic id="latex">{demoLatex}</MathJax>
                </div>
                <WsCommands noSave={prop.noSave} executeCode={executeCode} addTableau={addTableau} saveWorkspace={saveWorkspace} loadWorkspace={loadWorkspace} />
            </div>
            <WsData inputArray={inputArray} resultTable={resultTable} />
        </div>
    );
}

