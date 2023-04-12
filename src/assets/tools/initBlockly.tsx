import {javascriptGenerator} from 'blockly/javascript';
import { Renommage, Selection, Projection, Ensemble, Difference, Union, Intersection, Produit } from '../../assets/classes/Noeuds';
import Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
    Renommage.toBlockly(),
    Selection.toBlockly(),
    Projection.toBlockly(),
    Ensemble.toBlockly(),
    Difference.toBlockly(),
    Union.toBlockly(),
    Intersection.toBlockly(),
    Produit.toBlockly(),
    {
      "type": "base",
      "message0": "Début",
      "nextStatement": "Noeud",
      "colour": 60,
      "tooltip": "",
      "helpUrl": ""
    }
  ]);


  javascriptGenerator['selection'] = function(block: any) {
    var value_champs = javascriptGenerator.valueToCode(block, 'Champs', javascriptGenerator.ORDER_ATOMIC);
    var statements_elements = javascriptGenerator.statementToCode(block, 'ensemble');
    var code = '\\pi_{ ' + value_champs + ' }( \n' + statements_elements + '\n );\n';
    return code;
  };
  javascriptGenerator['renommage'] = function(block: any) {
    var value_champs = javascriptGenerator.valueToCode(block, 'Champs', javascriptGenerator.ORDER_ATOMIC);
    var statements_elements = javascriptGenerator.statementToCode(block, 'ensemble');
    var code = '\\pi_{ ' + value_champs + ' }( \n' + statements_elements + '\n );\n';
    return code;
  };
  javascriptGenerator['projection'] = function(block: any) {
    var value_champs = javascriptGenerator.valueToCode(block, 'Champs', javascriptGenerator.ORDER_ATOMIC);
    var statements_elements = javascriptGenerator.statementToCode(block, 'ensemble');
    var code = '\\pi_{ ' + value_champs + ' }( \n' + statements_elements + '\n );\n';
    return code;
  };
  javascriptGenerator['ensemble'] = function(block: any) {
    var value_champs = javascriptGenerator.valueToCode(block, 'name', javascriptGenerator.ORDER_ATOMIC);
    var code = value_champs;
    return code;
  };
  javascriptGenerator['difference'] = function(block: any) {
    var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
    var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
    var code = '(\n' + statements_elements1 + '\n) \\\\ (\n' + statements_elements2 + '\n)\n';

    return code;
  }
  
  javascriptGenerator['intersection'] = function(block: any) {
    var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
    var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
    var code = '(\n' + statements_elements1 + '\n) \\cup (\n' + statements_elements2 + '\n)\n';
    return code;
  }
  
  javascriptGenerator['union'] = function(block: any) {
    var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
    var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
    
    var code = '(\n' + statements_elements1 + '\n) \\cap (\n' + statements_elements2 + '\n)\n';
    return code;
  }
  javascriptGenerator['produit'] = function(block: any) {
    var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
    var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
    var code = '(\n' + statements_elements1 + '\n) \\times (\n' + statements_elements2 + '\n)\n';
    return code;
  }
  javascriptGenerator['text'] = function(block: any) {
    const textValue = block.getFieldValue('TEXT');
    var code = textValue;
    return [code, javascriptGenerator.ORDER_FUNCTION_CALL];
  }
  javascriptGenerator['base'] = function(block: any) {
    var statements_elements = javascriptGenerator.statementToCode(block, 'nextStatement');
    var code = statements_elements;
    return code;
  }


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
          }
        ]
      }
    ]
  };


  export var options = { 
    toolbox : toolbox, 
    collapse : true, 
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

  