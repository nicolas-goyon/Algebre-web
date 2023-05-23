import { WorkspaceSvg, svgResize, Block, serialization, inject } from "blockly";
import { options, javascriptGen, sampleGenerator as LatexGenerator } from '../../assets/tools/initBlockly';
import React, { useEffect, useState } from "react";
import { transpile } from "typescript";
import type { WsSerialized } from "../../assets/Types/WsSerialized";

export default function WsBlockly(prop: any) {

    const [blockWorkspace, setBlockWorkspace] = useState<WorkspaceSvg>();
    const [firstLoad, setFirstLoad] = useState<boolean>(false);
    
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

    // TODO : get a function that return the latex code generated
    function getLatexCode(): string {
        const baseBlock = getDebut();

        const code = LatexGenerator.blockToCode(baseBlock);
        return code;
    }

    // TODO : get a function that return the javascript code generated
    function getJavascriptCode(): string {
        const baseBlock = getDebut();

        const code = javascriptGen.blockToCode(baseBlock);
        const cleanCode = transpile(code)
        return cleanCode;
    }

    function getTypescriptCode(): string {
        const baseBlock = getDebut();

        const code = javascriptGen.blockToCode(baseBlock);
        return code;
    }
    
    // TODO : get a function to return the workspace serialized
    function getSerializedWorkspace(): WsSerialized {
        if (blockWorkspace === undefined) {
            throw new Error("blockWorkspace doesn't exist");
        }

        
        const serializer = new serialization.blocks.BlockSerializer();
        const state = serializer.save(blockWorkspace);
        return state;
    }

    // TODO : get a function to load a workspace from a serialized workspace
    function loadSerliazedWorkspace(state: WsSerialized) {
        if (blockWorkspace === undefined) {
            throw new Error("blockWorkspace doesn't exist");
        }
        if (state === undefined || state === null) {
            throw new Error("state doesn't exist");
        }
        const serializer = new serialization.blocks.BlockSerializer();
        // load the workspace from JSON format
        blockWorkspace.clear();
        serializer.load(state, blockWorkspace);
    }
    // TODO : initialize the workspace with option (useEffect)

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
            // WorkspaceRelations.clearInstance();
            setFirstLoad(true);
            window.addEventListener('resize', onresize, false);
            javascriptGen.init(blockWorkspace);
            javascriptGen.INDENT = '';
            LatexGenerator.init(blockWorkspace);
            var x = 100.0;
            var y = 100.0;
            // Créer un bloc "base" et le placer au centre du workspace.
            var baseBlock = blockWorkspace.newBlock('debut');
            baseBlock.initSvg();
            baseBlock.setDeletable(false);
            baseBlock.setMovable(false);
            baseBlock.render();
            baseBlock.moveBy(x, y);

            // if (prop.id === null) {
            //     return;
            // }
            // loadWorkspace(prop.id);
            // loadRelations(prop.id);
        }


    }, [blockWorkspace, firstLoad]);

    return (
        <>
            {/* Zone de Blockly */}
            <div id="blocklyArea" className='w-full'>
                <div id="blocklyDiv" style={prop.blocklyDivStyle}></div>
            </div>
        </>
    )
}