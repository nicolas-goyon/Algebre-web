
import { Renommage, Selection, Projection, Ensemble, Difference, Union, Intersection, Produit, Jointure, Division } from '../../assets/classes/Noeuds';
import { defineBlocksWithJsonArray, } from "blockly";


defineBlocksWithJsonArray([
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

var toolbox = {
  "kind": "categoryToolbox",
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
  toolbox: toolbox,
  collapse: true,
  comments: true,
  disable: true,
  maxBlocks: Infinity,
  trashcan: true,
  horizontalLayout: true,
  toolboxPosition: 'start',
  css: true,
  media: 'https://blockly-demo.appspot.com/static/media/',
  rtl: false,
  // scrollbars : true, 
  sounds: false,
  oneBasedIndex: true,
  zoom: {
    controls: false,
    wheel: true,
    startScale: 1,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2
  }
};

