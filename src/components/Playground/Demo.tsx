import React, { useEffect, useState } from 'react';
import Blockly from "blockly";
import {javascriptGenerator} from 'blockly/javascript'
import '../../assets/tools/initBlockly';



export default function Demo(prop: any) {
  function updateCode(event: any){
    console.log("updateCode");
    if(blockWorkspace !== undefined) {
      var code = javascriptGenerator.workspaceToCode(blockWorkspace);
      console.log(code);
    }
  
  }

  const [blockWorkspace, setBlockWorkspace] = useState<Blockly.WorkspaceSvg>();

  var toolbox = {
    "kind":"categoryToolbox",
    "contents": [
      {
        "kind": "category",
        "name": "Unaire",
        "contents": [
          {
            "kind": "block",
            "type": "renommage"
          },
          {
            "kind": "block",
            "type": "selection"
          },
          {
            "kind": "block",
            "type": "projection"
          },
        ]
      },

      {
        "kind": "category",
        "name": "Binaire",
        "contents": [
          {
            "kind": "block",
            "type": "difference"
          },
          {
            "kind": "block",
            "type": "union"
          },
          {
            "kind": "block",
            "type": "intersection"
          },          
          {
            "kind": "block",
            "type": "produit"
          },
        ]
      },

      {
        "kind": "category",
        "name": "Autre",
        "contents": [
          {
            "kind": "block",
            "type": "ensemble"
          },
          {
            "kind": "block",
            "type": "text"
          },
          {
            "kind": "block",
            "type": "base"
          },
        ]
      }
    ]
  };


  var options = { 
    toolbox : toolbox, 
    collapse : false, 
    comments : true, 
    disable : true, 
    maxBlocks : Infinity, 
    trashcan : true, 
    horizontalLayout : true, 
    toolboxPosition : 'start', 
    css : true, 
    media : 'https://blockly-demo.appspot.com/static/media/', 
    rtl : false, 
    scrollbars : true, 
    sounds : true, 
    oneBasedIndex : true, 
    zoom : {
      controls : false, 
      wheel : false, 
      startScale : 1, 
      maxScale : 3, 
      minScale : 0.3, 
      scaleSpeed : 1.2
    }
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
