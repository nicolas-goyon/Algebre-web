import React, { useEffect, useState } from 'react';
import Blockly from "blockly";
import {javascriptGenerator} from 'blockly/javascript'
import { options, sampleGenerator } from '../../assets/tools/initBlockly';
import { MathJax } from 'better-react-mathjax';
import { api } from 'src/assets/tools/ApiCenter';
import { config } from 'src/config';



export default function WsContent(prop: any) {
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
        code = javascriptGenerator.blockToCode(baseBlock);
        let code2 = sampleGenerator.blockToCode(baseBlock);
        console.log("test"); // TODO : remove
        console.log(code2); // TODO : remove
        // afficher le code dans la zone d'affichage
        if(code != null && code.length > 0){
            setDemoLatex('$' + code + '$');
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
        if (blockWorkspace === undefined) {
            return;
        }
        var workspace = blockWorkspace;
        const state = serializer.save(workspace);
        const data = {
            "workspace": JSON.stringify(state),
        }
        api.post(config.apiUrl +'/workspace/save', data)
        .then((res) => {
            console.log("Workspace saved");
            console.log(res);
        })
        .catch((err) => {
            console.log("Workspace not saved");
            console.log(err);
        });

    }

    function loadWorkspace(id : number | null){
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
            javascriptGenerator.init(workspace);
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

        if( blockWorkspace !== undefined &&  prop !== undefined && prop.id !== undefined && prop.id !== null && !firstLoad){
            loadWorkspace(prop.id);
        }
    }, [blockWorkspace, firstLoad]);

    
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
            <div className='flex justify-center'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={saveWorkspace}>Save</button>
            </div>
        </div>
    );    
}

