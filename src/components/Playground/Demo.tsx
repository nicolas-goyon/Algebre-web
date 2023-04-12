import React, { useEffect, useState } from 'react';
import Blockly from "blockly";
import {javascriptGenerator} from 'blockly/javascript'
import { options } from '../../assets/tools/initBlockly';



export default function Demo(prop: any) {
  const [blockWorkspace, setBlockWorkspace] = useState<Blockly.WorkspaceSvg>();
  function updateCode() {
    if (blockWorkspace === undefined) {
      return;
    }

    var workspace = blockWorkspace;
    var topBlocks = workspace.getTopBlocks(true);
    var baseBlock = null;
  
    // Trouve le bloc "base".
    for (var i = 0; i < topBlocks.length; i++) {
      if (topBlocks[i].type == 'base') {
        baseBlock = topBlocks[i];
        break;
      }
    }
  
    // Si le bloc "base" est trouvé, récupère le premier bloc enfant et commence la compilation à partir de là.
    if (baseBlock) {
      var firstChildBlock = baseBlock.nextConnection.targetBlock();
      javascriptGenerator.init(blockWorkspace);
      var code = javascriptGenerator.blockToCode(firstChildBlock);
      // afficher le code dans la zone d'affichage
      document.getElementById('latex')!.innerHTML = code;

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
      var canvas = workspace.getCanvas();
      var x = Number(canvas.style.width) / 2;
      
      var y = Number(canvas.style.height) / 2;
    
      // Créer un bloc "base" et le placer au centre du workspace.
      var baseBlock = workspace.newBlock('base');
      baseBlock.initSvg();
      baseBlock.render();
      baseBlock.moveBy(x, y);

      // rendre le bloc "base" immobile et non supprimable.
      baseBlock.setMovable(false);
      baseBlock.setDeletable(false);

    }
    console.log("blockWorkspace: ", blockWorkspace);
  });



  return (
    <div>
    <div id="blocklyArea" className='w-full'>
      <div id="blocklyDiv" style={{ height: 600, width: '100%' }}></div>
    </div>
    <div>
      {/* Zone d'affichage du latex, zone ressemblant à une zone de code */}
      <div id="latexDiv">
        <code id="latex" className="block whitespace-pre overflow-x-scroll bg-black rounded-md text-white" ></code>
      </div>
    </div>
    </div>
  );    
}




// import React from 'react';
// import { MathJax } from 'better-react-mathjax';

// export default function Union(prop: any) {
//     const latexString = "$\cup$"
//     return (
//         <div className="border-solid pointer-events-none select-none border-b-2 border-t-2 border-light-900  w-100 px-1">
//             <MathJax inline dynamic>{latexString}</MathJax>
//         </div>
//     )
// }
