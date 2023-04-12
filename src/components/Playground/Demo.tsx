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
      console.log(code);
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
    }
    console.log("blockWorkspace: ", blockWorkspace);
  });


  
  return (
    <div id="blocklyArea" className='w-full'>
      <div id="blocklyDiv" style={{ height: 600, width: '100%' }}></div>
    </div>
  );    
}
