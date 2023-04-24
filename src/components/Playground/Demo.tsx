import React, { useEffect, useState } from 'react';
import Blockly from "blockly";
import {javascriptGenerator} from 'blockly/javascript'
import { options } from '../../assets/tools/initBlockly';
import { MathJax } from 'better-react-mathjax';



export default function Demo(prop: any) {
  const [blockWorkspace, setBlockWorkspace] = useState<Blockly.WorkspaceSvg>();
  const [demoLatex, setDemoLatex] = useState<string>('');
  const [firstLoad, setFirstLoad] = useState<boolean>(false);
  function updateCode(event : Blockly.Events.Abstract) {
    if (blockWorkspace === undefined) {
      return;
    }
    // if (event.type == Blockly.Events.BLOCK_DRAG ){
      var workspace = blockWorkspace;
      // get blocs that have no parent
      var topBlocks = workspace.getTopBlocks(false);
      var baseBlock = null;
      // Trouve le bloc "debut".   

      for (var i = 0; i < topBlocks.length; i++) {
        console.log(topBlocks[i].type);
        if (topBlocks[i].type === 'debut') {
          baseBlock = topBlocks[i];
          break;
        }
      
      }
    
      // Si le bloc "base" est trouvé, récupère le premier bloc enfant et commence la compilation à partir de là.
      if (baseBlock) {
        // console.log(firstChildBlock);
        var code = "";
        // code = javascriptGenerator.blockToCode(baseBlock);
        code = javascriptGenerator.blockToCode(baseBlock);
        // afficher le code dans la zone d'affichage
        if(code != null && code.length > 0){
          setDemoLatex('$' + code + '$');
        }
        console.log(code)
      }
    // }
  }
  function onresize(e: any) {
    const blocklyArea = document.getElementById('blocklyArea');
    const blocklyDiv = document.getElementById('blocklyDiv');
    if (!blocklyArea || !blocklyDiv) {
      // One or both elements doesn't exist.  Maybe the blocklyDiv is
      // hidden, or the divs haven't been created yet.
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


  useEffect(() => {
    // Si le workspace n'est pas défini, on le crée
    if (blockWorkspace === undefined) {
      setBlockWorkspace(
        blockWorkspace => Blockly.inject(
          'blocklyDiv',
          options
        )
      )
      console.log("blockWorkspace created");
    } // fin si
    if(blockWorkspace !== undefined && !firstLoad) {
      setFirstLoad(true);
      blockWorkspace.addChangeListener(updateCode);
      window.addEventListener('resize', onresize, false);
      var workspace = blockWorkspace;
      javascriptGenerator.init(workspace);
      var x = 100.0;
      var y = 100.0;
      console.log(x, y);
      // Créer un bloc "base" et le placer au centre du workspace.
      var baseBlock = workspace.newBlock('debut');
      baseBlock.initSvg();
      baseBlock.render();
      baseBlock.moveBy(x, y);
    }
  });

  var blocklyDivStyle = { height: 600, width: '100%' }

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
    </div>
  );    
}

