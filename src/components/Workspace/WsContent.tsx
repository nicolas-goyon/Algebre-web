import React, { useEffect, useState } from 'react';
import { WorkspaceSvg, serialization, Events, svgResize, inject, Block } from "blockly";
import { options, sampleGenerator as LatexGenerator } from '../../assets/tools/initBlockly';
import { javascriptGen } from 'src/assets/Blockly/javascript';
import { MathJax } from 'better-react-mathjax';
import Relation from 'src/assets/classes/Relation';
import { api } from 'src/assets/tools/ApiCenter';
import { config } from 'src/config';
import Table from '../Utils/Table';
import CsvInput from '../Input/CsvInput';
// import { transpile } from "typescript";
// import test from 'src/assets/Tests/WorkspaceRelationTest';
import WorkspaceRelations from 'src/assets/classes/WorkspaceRelation';
import { extractTableau } from 'src/assets/Helper/addTableau';
import { fromJsonNextNode } from 'src/assets/classes/Noeuds';

type WsData = {
    title: string,
    data: any[],
    columnNames: string[],
    isShrinkable: boolean,
}

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
    const [result, setResult] = useState<string>('');;
    const [resultTable, setResultTable] = useState<WsData>({
        title: 'Result',
        data: dummyTableData,
        columnNames: dummyTableColumnNames,
        isShrinkable: false,
    });
    var blocklyDivStyle = { height: 600, width: '100%' }
    const serializer = new serialization.blocks.BlockSerializer();


    function updateCode(event: Events.Abstract) {
        const baseBlock = getDebut();
        // Si le bloc "base" est trouvé, récupère le premier bloc enfant et commence la compilation à partir de là.

        let code = LatexGenerator.blockToCode(baseBlock);
        // afficher le code dans la zone d'affichage
        if (code != null && code.length > 0) {
            setDemoLatex('$' + code + '$');
        }
        else if (code.length === 0) {
            setDemoLatex('');
        }
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

        // Compute the absolute coordinates and dimensions of blocklyArea.
        let element: any = blocklyArea;
        let x = 0;
        let y = 0;
        do {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        } while (element);
        // Position blocklyDiv over blocklyArea.
        blocklyDiv.style.left = x + 'px';
        blocklyDiv.style.top = y + 'px';
        blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
        blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
        svgResize(blockWorkspace);
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
        var workspace = blockWorkspace;

        /* ----------------------------- SAVE WORKSPACE ----------------------------- */
        const state = serializer.save(workspace);
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

                if (blockWorkspace === undefined) {
                    return;
                }
                var workspace = blockWorkspace;

                // load the workspace from JSON format
                let state = JSON.parse(res.response.workspace);
                workspace.clear();
                serializer.load(state, workspace);
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

        if (blockWorkspace === undefined) {
            console.log("blockWorkspace doesn't exist");
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


    useEffect(() => {
        // Si le workspace n'est pas défini, on le crée
        if (blockWorkspace === undefined) {
            setBlockWorkspace(
                blockWorkspace => inject(
                    'blocklyDiv',
                    options
                )
            )
        } // fin si
        if (blockWorkspace !== undefined && !firstLoad) {
            WorkspaceRelations.clearInstance();
            setFirstLoad(true);
            blockWorkspace.addChangeListener(updateCode);
            window.addEventListener('resize', onresize, false);
            var workspace = blockWorkspace;
            javascriptGen.init(workspace);
            javascriptGen.INDENT = '';
            LatexGenerator.init(workspace);
            var x = 100.0;
            var y = 100.0;
            // Créer un bloc "base" et le placer au centre du workspace.
            var baseBlock = workspace.newBlock('debut');
            baseBlock.initSvg();
            baseBlock.setDeletable(false);
            baseBlock.setMovable(false);
            baseBlock.render();
            baseBlock.moveBy(x, y);

            if (prop.id === null) {
                return;
            }
            loadWorkspace(prop.id);
            loadRelations(prop.id);
            // console.log("===================================");
            // test();
            // console.log("===================================");
        }


    }, [blockWorkspace, firstLoad]);


    function addTableau(text: string, name: string) {
        const myData = extractTableau(text, name);
        if (myData === null) {
            alert("Erreur lors de l'ajout du tableau");
            return;
        }
        const newRelation = new Relation(name, myData.data, myData.columnNames);
        WorkspaceRelations.addTable(newRelation);
        setInputArray(inputArray => [...inputArray, myData]);
    }

    function getDebut(): Block | null {
        if (blockWorkspace === undefined) {
            return null;
        }
        // get blocs that have no parent
        var topBlocks = blockWorkspace.getTopBlocks(false);
        var baseBlock = null;
        // Trouve le bloc "debut".   

        for (var i = 0; i < topBlocks.length; i++) {
            if (topBlocks[i].type === 'debut') {
                baseBlock = topBlocks[i];
                break;
            }
        }
        return baseBlock;
    }

    function executeCode() {
        const debut = getDebut();
        var code = javascriptGen.blockToCode(debut);
        executeAlgebra(code);
        setResult(result => code);
    }
    function executeAlgebra(code: string) {
        console.log("Execute Algebra Start");
        try {
            console.log(code);
            const rel = fromJsonNextNode(JSON.parse(code));
            console.info(rel);
            if (rel === null) {
                return;
            }
            const res = rel.execute();
            console.info(res);
            const dataRes = {
                title: "Result",
                data: res.getData(),
                columnNames: res.getColumnNames(),
                isShrinkable: true,
            }
            setResultTable(dataRes);
        } catch (error) {
            alert(error);
        }
        console.log("Execute Algebra End");
    }


    return (
        <div>
            <div id="blocklyArea" className='w-full'>
                <div id="blocklyDiv" style={blocklyDivStyle}></div>
            </div>
            <div>
                {/* Zone d'affichage du latex, zone ressemblant à une zone de code */}
                <div id="latexDiv" className='overflow-x-scroll bg-black rounded-md text-white'>
                    <MathJax dynamic id="latex">{demoLatex}</MathJax>
                </div>
            </div>
            {/* Save button */}
            {prop.noSave === undefined || prop.noSave === false ?
                <>
                    <div className='flex justify-center'>
                        <button id="saveButton" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-500 ease-in-out' onClick={saveWorkspace}>Save Workspace</button>
                    </div>
                    <div className='flex justify-center'>
                        <button id="saveButton" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-500 ease-in-out' onClick={saveRelations}>Save Relations</button>
                    </div>
                </>
                : null
            }
            {/* Execute button */}
            <div className='flex justify-center'>
                <button id="executeButton" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-500 ease-in-out' onClick={executeCode}>Execute</button>
            </div>
            {/* Zone d'affichage du résultat */}
            <div id="resultArea" className='flex justify-center'>
                <div id="resultDiv" className='overflow-x-scroll bg-black rounded-md text-white'>
                    {result}
                </div>
            </div>
            {/* Zone d'ajout de fichier csv pour ajouter de nouveaux tableaux */}
            <div className='flex justify-center'>
                <div className='w-2/3'>
                    <CsvInput callBack={addTableau} />
                </div>
            </div>

            {/* Tableau de données */}
            {/* Deux colonnes, l'une faisant 2/3 et l'autre 1/3 : plusieurs tables les unes au dessus des autres avec un titre dans la première et qu'une seule table avec le titre résultat dans la seconde */}
            <div id="dataArea" className='flex justify-center'>
                <div id="inputArea" className='w-2/3'>
                    {inputArray.map((input, index) => (
                        <Table key={index} columnNames={input.columnNames} data={input.data} title={input.title} isShrinkable={input.isShrinkable} />
                    ))}
                </div>
                <div id="resultArea" className='w-1/3'>
                    <Table columnNames={resultTable.columnNames} data={resultTable.data} title={resultTable.title} isShrinkable={resultTable.isShrinkable} />
                </div>
            </div>
        </div>
    );
}
