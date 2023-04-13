import React, { useEffect, useState } from 'react';
import Blockly from "blockly";
import {javascriptGenerator} from 'blockly/javascript'
import { options } from '../../assets/tools/initBlockly';
import { MathJax } from 'better-react-mathjax';



export default function Demo(prop: any) {
  const [blockWorkspace, setBlockWorkspace] = useState<Blockly.WorkspaceSvg>();
  const [demoLatex, setDemoLatex] = useState<string>('');
  function updateCode(event : Blockly.Events.Abstract) {
    if (blockWorkspace === undefined) {
      return;
    }
    if (event.type == Blockly.Events.BLOCK_DRAG){
      var workspace = blockWorkspace;
      // get blocs that have no parent
      var topBlocks = workspace.getTopBlocks(false);
      var blocks = workspace.getAllBlocks(false);
      var baseBlock = null;
      console.log("====================================");
      console.log(topBlocks);
      // Trouve le bloc "base".
      for (var i = 0; i < blocks.length; i++) {
        console.log(blocks[i].type);
      }
    

      for (var i = 0; i < topBlocks.length; i++) {
        // console.log(topBlocks[i].type);
        if (topBlocks[i].type === 'base') {
          baseBlock = topBlocks[i];
          break;
        }
      
      }
    
      // Si le bloc "base" est trouvé, récupère le premier bloc enfant et commence la compilation à partir de là.
      if (baseBlock) {
        var firstChildBlock = baseBlock.nextConnection.targetBlock();
        // console.log(firstChildBlock);
        var code = javascriptGenerator.blockToCode(firstChildBlock);
        // afficher le code dans la zone d'affichage
        if(code != null && code.length > 0){
          setDemoLatex('$' + code + '$');
        }
      }
    }
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
      console.log("blockWorkspace created");
    } // fin si
    if(blockWorkspace !== undefined) {
      blockWorkspace.addChangeListener(updateCode);
      var workspace = blockWorkspace;
      javascriptGenerator.init(workspace);
      var canvas = workspace.getCanvas();
      var x = Number(canvas.style.width) / 2;
      
      var y = Number(canvas.style.height) / 2;
    
      // Créer un bloc "base" et le placer au centre du workspace.
      var baseBlock = workspace.newBlock('base');
      baseBlock.initSvg();
      // workspace.addTopBlock(baseBlock);
      // console.log(baseBlock);
      baseBlock.render();
      // console.log(baseBlock.on);
      baseBlock.moveBy(x, y);

      
    }
  });


  var latexString = '$\\frac{1}{2}$';
  return (
    <div>
    <div id="blocklyArea" className='w-full'>
      <div id="blocklyDiv" style={{ height: 600, width: '100%' }}></div>
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

