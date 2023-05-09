import React, { useEffect, useState } from 'react';
import Blockly from "blockly";
import { options, javascriptGen, sampleGenerator } from '../../assets/tools/initBlockly';
import { MathJax } from 'better-react-mathjax';
import { api } from 'src/assets/tools/ApiCenter';
import { config } from 'src/config';
import Table from '../Utils/Table';
import CsvInput from '../Input/CsvInput';
import csvReader from 'src/assets/tools/CsvUtils';



export default function WsContent(prop: any) {
    // TODO : remove
    const dummyTableColumnNames = [
        "Nom",
        "Prénom",
        "Age",
    ];

    const dummyTableData = [
        ["Doe", "John", "42"],
        ["Doe", "Jane", "43"],
        ["Dark", "John", "32"],
        ["Dark", "Jane", "33"],
        ["Lenon", "John", "22"],
    ];
    const [inputArray, setInputArray] = useState(
        [
            {
                title: "table1",
                data: dummyTableData,
                columnNames: dummyTableColumnNames,
                isShrinkable: true,
            },
            {
                title: "table2",
                data: dummyTableData,
                columnNames: dummyTableColumnNames,
                isShrinkable: true,
            },
            {
                title: "table3",
                data: dummyTableData,
                columnNames: dummyTableColumnNames,
                isShrinkable: false,
            }
        ]
    );
    const [blockWorkspace, setBlockWorkspace] = useState<Blockly.WorkspaceSvg>();
    const [demoLatex, setDemoLatex] = useState<string>('');
    const [firstLoad, setFirstLoad] = useState<boolean>(false);
    var blocklyDivStyle = { height: 600, width: '100%' }
    const serializer = new Blockly.serialization.blocks.BlockSerializer();

    
    function updateCode(event : Blockly.Events.Abstract) {
        if (blockWorkspace === undefined) {
            return;
        }
        var workspace = blockWorkspace;
        // get blocs that have no parent
        var topBlocks = workspace.getTopBlocks(false);
        var baseBlock = null;
        // Trouve le bloc "debut".   

        for (var i = 0; i < topBlocks.length; i++) {
            if (topBlocks[i].type === 'debut') {
                baseBlock = topBlocks[i];
                break;
            }
        }
        if(baseBlock === null){
            return;
        }
        
        // Si le bloc "base" est trouvé, récupère le premier bloc enfant et commence la compilation à partir de là.
        var code = "";
        code = javascriptGen.blockToCode(baseBlock);
        let code2 = sampleGenerator.blockToCode(baseBlock);
        console.log(code);
        console.log("test"); // TODO : remove
        console.log(code2); // TODO : remove
        // afficher le code dans la zone d'affichage
        if(code != null && code.length > 0){
            setDemoLatex('$' + code + '$');
        }
        else if (code.length === 0){
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
        let element : any = blocklyArea;
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
        Blockly.svgResize(blockWorkspace);
    };

    function saveWorkspace(e: any){ 
        if(prop.noSave === true){
            console.log("Workspace can not be saved");
            return;
        }

        if (blockWorkspace === undefined) {
            console.log("blockWorkspace doesn't exist");
            return;
        }
        var workspace = blockWorkspace;
        const state = serializer.save(workspace);
        const data = {
            "workspace": JSON.stringify(state),
            "workspaceId": prop.id,
        }
        api.post(config.apiUrl +'/workspace/save', data)
        .then((res) => {
            console.log("Workspace saved");
            // Change the button color to green then back to normal after 1 second
            var button = document.getElementById("saveButton");
            if (button === null || button === undefined) { return; }
            // Set the button color to green
            button.classList.add("bg-success");
            setTimeout(() => {
                if (button === null || button === undefined) { return; }
                // Set the button color to normal
                button.classList.remove("bg-success");
            }
                , 2000);
        })
        .catch((err) => {
            console.log("Workspace not saved");
            console.log(err);
        });

    }

    function loadWorkspace(id : number | null){
        if(prop.noLoad === true){
            return;
        }

        // Request api to load the workspace
        api.get(config.apiUrl +'/workspace/load/' + id)
        .then((res) => {
            console.log("Workspace loaded");
            console.log(res);
            if(res.status !== 200){
                return;
            }

            if (blockWorkspace === undefined) {
                return;
            }
            var workspace = blockWorkspace;
            
            // load the workspace from JSON format
            workspace.clear();
            serializer.load(res.response.workspace, workspace);
        })
        .catch((err) => {
            console.log("Workspace not loaded");
            console.log(err);
        });
    }



    useEffect(() => {
        // Si le workspace n'est pas défini, on le crée
        if (blockWorkspace === undefined) {
            setBlockWorkspace(
                blockWorkspace => Blockly.inject(
                    'blocklyDiv',
                    options
                )
            )
        } // fin si
        if(blockWorkspace !== undefined && !firstLoad) {
            setFirstLoad(true);
            blockWorkspace.addChangeListener(updateCode);
            window.addEventListener('resize', onresize, false);
            var workspace = blockWorkspace;
            javascriptGen.init(workspace);
            sampleGenerator.init(workspace);
            var x = 100.0;
            var y = 100.0;
            // Créer un bloc "base" et le placer au centre du workspace.
            var baseBlock = workspace.newBlock('debut');
            baseBlock.initSvg();
            baseBlock.setDeletable(false);
            baseBlock.setMovable(false);
            baseBlock.render();
            baseBlock.moveBy(x, y);
        }

        if( blockWorkspace !== undefined &&  prop !== undefined && prop.id !== undefined && prop.id !== null && !firstLoad && (prop.noLoad === false || prop.noLoad === undefined )){
            loadWorkspace(prop.id);
        }
    }, [blockWorkspace, firstLoad]);


    function addTableau(text: string, name: string){
        let [headers, tableau] = csvReader(text);
        if(tableau === null || tableau === undefined || headers === null || headers === undefined){
            return;
        }

        const inputArea = document.getElementById('inputArea');
        if (!inputArea) {
            console.log("inputArea doesn't exist");
            return;
        }
        const myData = {
            title: name,
            data: tableau,
            columnNames: headers,
            isShrinkable: true,
        }

        setInputArray(inputArray => [...inputArray, myData]);
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
                <div className='flex justify-center'>
                    <button id="saveButton" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-500 ease-in-out' onClick={saveWorkspace}>Save</button>
                </div>
            : null
            }
            {/* Zone d'ajout de fichier csv pour ajouter de nouveaux tableaux */}
            {/* TODO : remove */}
            <div className='flex justify-center'>
                <div className='w-2/3'>
                    <CsvInput callBack={addTableau}/>
                </div>
            </div>

            {/* Tableau de données */}
            {/* Deux colonnes, l'une faisant 2/3 et l'autre 1/3 : plusieurs tables les unes au dessus des autres avec un titre dans la première et qu'une seule table avec le titre résultat dans la seconde */}
            {/* TODO : remove */}
            <div id="dataArea" className='flex justify-center'>
                <div id="inputArea" className='w-2/3'>
                    {inputArray.map((input, index) => (
                        <Table key={index} columnNames={input.columnNames} data={input.data} title={input.title} isShrinkable={input.isShrinkable}/>
                    ))}
                </div> 
                <div id="resultArea" className='w-1/3'>
                    <Table columnNames={dummyTableColumnNames} data={dummyTableData} title="Résultat" />
                </div> 
            </div>  
        </div>
    );    
}

