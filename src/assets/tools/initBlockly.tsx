
import {javascriptGenerator} from 'blockly/javascript';
import WorkspaceRelations from '../classes/WorkspaceRelation';
import Relation from '../../assets/classes/Relation';
import { v4 } from 'uuid';
import { Renommage, Selection, Projection, Ensemble, Difference, Union, Intersection, Produit, Jointure, Division } from '../../assets/classes/Noeuds';
import * as Blockly from "blockly";
import MyGenerator from './MyGen';
export const sampleGenerator : any = MyGenerator;
export const javascriptGen : any = javascriptGenerator;

Blockly.defineBlocksWithJsonArray([
    Renommage.toBlockly(),
    Selection.toBlockly(),
    Projection.toBlockly(),
    Ensemble.toBlockly(),
    Difference.toBlockly(),
    Union.toBlockly(),
    Intersection.toBlockly(),
    Produit.toBlockly(),
    Jointure.toBlockly(),
    Division.toBlockly(),
    {
        "type": "debut",
        "message0": "Début %1",
        "args0": [
        {
            "type": "input_statement",
            "name": "suivant",
            "check": "Noeud"
        }
    ],
        // "nextStatement": "Noeud",
        "colour": 60,
        "tooltip": "",
        "helpUrl": ""
    }
  ]);

    /* -------------------------------------------------------------------------- */
    /*                            JAVASCRIPT GENERATOR                            */
    /* -------------------------------------------------------------------------- */
    // Javascript generator for the relation block : TODO : make the code real javascript code ( not latex )


    javascriptGenerator['renommage'] = function(block: any) {
        const value_champs = javascriptGenerator.statementToCode(block, 'Champs');
        const statements_elements = javascriptGenerator.statementToCode(block, 'ensemble');
        // var code = '\\rho_{' + value_champs + ' }(' + statements_elements + ')';
        let code = statements_elements;
        let champsTuples = value_champs.split(',');
        let champsDepart : string[] = [];
        let champsArrivee : string[] = [];
        champsTuples.forEach((champsTuple: string) => {
            let champs = champsTuple.split('=>');
            champsDepart.push(champs[0]);
            champsArrivee.push(champs[1]);
        });
        code += '.renameColumns(' + JSON.stringify(champsDepart) + ', ' + JSON.stringify(champsArrivee) + ')';
        return code;
    };
    javascriptGenerator['selection'] = function(block: any) {
        var value_champs = javascriptGenerator.statementToCode(block, 'Champs');
        var statements_elements = javascriptGenerator.statementToCode(block, 'ensemble');
        // var code = '\\sigma_{' + value_champs + '}(' + statements_elements + ')';
        let code = statements_elements;
        // Split the && and || then split with the = and the != and the > and the < and the >= and the <=
        // example : a=1 && b<=2 || c>3 && d!=4
        // conditions = [
        //     ["a", "=", "1"],
        //     ["b", "<=", "2"],
        //     ["c", ">", "3"],
        //     ["d", "!=", "4"]
        // ]
        // conditionLinks = [ "&&", "||", "&&" ]

        let conditions : string[][] = [];
        let conditionLinks : string[] = [];
        let conditionsString = value_champs.split(' && ');
        conditionsString.forEach((conditionString: string) => {
            let condition = conditionString.split(' || ');
            condition.forEach((conditionElement: string) => {
                let conditionElementSplit = conditionElement.split(' ');
                conditions.push([conditionElementSplit[0], conditionElementSplit[1], conditionElementSplit[2]]);
                conditionLinks.push('||');
            });
            conditionLinks.push('&&');
        });
        conditionLinks.pop();

        // Now make the code : functionCheck = (row: Record<string, any>) => { return row["a"] == 1 && row["b"] <= 2 || row["c"] > 3 && row["d"] != 4; }
        let functionCheck = '(row: Record<string, any>) => { return ';
        conditions.forEach((condition: string[], index: number) => {
            functionCheck += 'row["' + condition[0] + '"] ' + condition[1] + ' ' + condition[2];
            if (index < conditions.length - 1) {
                functionCheck += ' ' + conditionLinks[index] + ' ';
            }
        });
        functionCheck += '; }';
        code += '.selectRowsWithCheck(' + functionCheck + ')';



        // let champsTuples = value_champs.split(',');
        // champsTuples.forEach((champsTuple: string) => {
        //     let champsValeur = champsTuple.split('=');
        //     code += '.selectRowsWithCheck("' + champsValeur[0] + '", (' + champsValeur[0] + ') => {return ' + champsValeur[0] + ' == \'' + champsValeur[1] + '\';})';
        // });
        return code;
    };


    javascriptGenerator['projection'] = function(block: any) {
        var value_champs = javascriptGenerator.statementToCode(block, 'Champs', javascriptGenerator.ORDER_ADDITION);
        var statements_elements = javascriptGenerator.statementToCode(block, 'ensemble', javascriptGenerator.ORDER_ADDITION);
        let code = statements_elements;
        let champs = value_champs.split(',');
        code += '.selectColumns(' + JSON.stringify(champs) + ')';
        return code;
    };
    javascriptGenerator['ensemble'] = function(block: any) {
        var textValue = javascriptGenerator.statementToCode(block, 'name', javascriptGenerator.ORDER_ADDITION);
        let code = 'WorkspaceRelations.getTableByName("' + textValue + '")';
        return code;
    };
    javascriptGenerator['text'] = function(block: any) {
        const textValue = block.getFieldValue('TEXT');
        return textValue;
    }
    javascriptGenerator['difference'] = function(block: any) {
        var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
        var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
        let code = statements_elements1;
        code += '.difference(' + statements_elements2 + ')';
        return code;
    }
    javascriptGenerator['debut'] = function(block: any) {
        var statements_elements = javascriptGenerator.statementToCode(block, 'suivant');
        const code = statements_elements;
        return code;
    }
    
    javascriptGenerator['intersection'] = function(block: any) {
        var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
        var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
        let code = statements_elements1;
        code += '.intersection(' + statements_elements2 + ')';
        return code;
    }
    
    javascriptGenerator['union'] = function(block: any) {
        var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
        var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
        let code = statements_elements1;
        code += '.union(' + statements_elements2 + ')';
        return code;
    }
    javascriptGenerator['produit'] = function(block: any) {
        var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
        var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
        let code = statements_elements1;
        code += '.product(' + statements_elements2 + ')';
        return code;
    }
    javascriptGenerator['jointure'] = function(block: any) {
        var value_champs = javascriptGenerator.statementToCode(block, 'Champs');
        var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
        var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
        let code = statements_elements1;
        const joinCheck = 'function (row1: Record<string,any>, row2 Record<string,any>) { return ' + value_champs.split(',').map((champ: string) => 'row1[\'' + champ + '\'] == row2[\'' + champ + '\']').join(' && ') + '; }';
        code += '.join(' + statements_elements2 + ', ' + joinCheck + ')';
        return code;
    };
    javascriptGenerator['division'] = function(block: any) {
        var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
        var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
        let code = statements_elements1;
        code += '.division(' + statements_elements2 + ')';
        return code;
    };
    /* -------------------------------------------------------------------------- */
    /*                          FIN JAVASCRIPT GENERATOR                          */
    /* -------------------------------------------------------------------------- */



  
    /* -------------------------------------------------------------------------- */
    /*                              CUSTOM GENERATOR                              */
    /* -------------------------------------------------------------------------- */



    sampleGenerator['renommage'] = function(block: any) {
        var value_champs = sampleGenerator.statementToCode(block, 'Champs');
        var statements_elements = sampleGenerator.statementToCode(block, 'ensemble');
        var code = '\\rho_{' + value_champs + ' }(' + statements_elements + ')';
        return code;
    };
    sampleGenerator['selection'] = function(block: any) {
        var value_champs = sampleGenerator.statementToCode(block, 'Champs');
        var statements_elements = sampleGenerator.statementToCode(block, 'ensemble');
        var code = '\\sigma_{' + value_champs + '}(' + statements_elements + ')';
        return code;
    };

    sampleGenerator['projection'] = function(block: any) {
        var value_champs = sampleGenerator.statementToCode(block, 'Champs');
        var statements_elements = sampleGenerator.statementToCode(block, 'ensemble');
        var code = '\\pi_{' + value_champs + ' }(' + statements_elements + ')';
        return code;
    };

    sampleGenerator['ensemble'] = function(block: any) {
        var value_champs = sampleGenerator.statementToCode(block, 'name');
        var code = value_champs;
        return code;
    };

    sampleGenerator['text'] = function(block: any) {
        const textValue = block.getFieldValue('TEXT');
        // const code = "\"" + textValue + "\"";
        // escape backslashes, slashes, single quotes and double quotes, underscores
        const code = textValue.replace(/\\/g, '\\\\').replace(/\//g, '\\/').replace(/'/g, '\\\'').replace(/"/g, '\\"').replace(/_/g, '\\_');
        return code;
    }

    sampleGenerator['difference'] = function(block: any) {
        var statements_elements1 = sampleGenerator.statementToCode(block, 'ensemble1');
        var statements_elements2 = sampleGenerator.statementToCode(block, 'ensemble2');
        var code = '(' + statements_elements1 + ') \\\\ (' + statements_elements2 + ')';
        return code;
    }

    sampleGenerator['intersection'] = function(block: any) {
        var statements_elements1 = sampleGenerator.statementToCode(block, 'ensemble1');
        var statements_elements2 = sampleGenerator.statementToCode(block, 'ensemble2');
        var code = '(' + statements_elements1 + ') \\cup (' + statements_elements2 + ')';
        return code;
    }

    sampleGenerator['union'] = function(block: any) {
        var statements_elements1 = sampleGenerator.statementToCode(block, 'ensemble1');
        var statements_elements2 = sampleGenerator.statementToCode(block, 'ensemble2');
        var code = '(' + statements_elements1 + ') \\cap (' + statements_elements2 + ')';
        return code;
    }

    sampleGenerator['produit'] = function(block: any) {
        var statements_elements1 = sampleGenerator.statementToCode(block, 'ensemble1');
        var statements_elements2 = sampleGenerator.statementToCode(block, 'ensemble2');
        var code = '(' + statements_elements1 + ') \\times [' + statements_elements2 + ']';
        return code;
    }

    sampleGenerator['debut'] = function(block: any) {
        var statements_elements = sampleGenerator.statementToCode(block, 'suivant');
        var code = statements_elements;
        return code;
    }
    sampleGenerator['jointure'] = function(block: any) {
        var value_champs = sampleGenerator.statementToCode(block, 'Champs');
        var statements_elements1 = sampleGenerator.statementToCode(block, 'ensemble1');
        var statements_elements2 = sampleGenerator.statementToCode(block, 'ensemble2');
        var code = '(' + statements_elements1 + ') \\bowtie_{' + value_champs + '} (' + statements_elements2 + ')';
        return code;
    };
    sampleGenerator['division'] = function(block: any) {
        var statements_elements1 = sampleGenerator.statementToCode(block, 'ensemble1');
        var statements_elements2 = sampleGenerator.statementToCode(block, 'ensemble2');
        var code = '(' + statements_elements1 + ') \\div (' + statements_elements2 + ')';
        return code;
    };
    /* -------------------------------------------------------------------------- */
    /*                           FIN DU CUSTOM GENERATOR                          */
    /* -------------------------------------------------------------------------- */




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
          {
            "kind": "block",
            "type": "jointure"
          },
          {
            "kind": "block",
            "type": "division"
          }
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
    // scrollbars : true, 
    sounds : false, 
    oneBasedIndex : true, 
    zoom : {
      controls : false, 
      wheel : true, 
      startScale : 1, 
      maxScale : 3, 
      minScale : 0.3, 
      scaleSpeed : 1.2
    }
  };

  