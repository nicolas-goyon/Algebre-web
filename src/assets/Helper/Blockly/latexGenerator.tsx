import MyGenerator from "src/assets/tools/MyGen";

// class SingletonMyGen {
//     private static instance: any;
//     private constructor() { }
//     public static getInstance() {
//         if (!SingletonMyGen.instance) {
//             SingletonMyGen.instance = MyGenerator;
//         }
//         return SingletonMyGen.instance;
//     }
// }
// export const latexGenerator: any = SingletonMyGen.getInstance();

export const latexGenerator : any= MyGenerator;

/* -------------------------------------------------------------------------- */
/*                              CUSTOM GENERATOR                              */
/* -------------------------------------------------------------------------- */



// latexGenerator['renommage'] = function (block: any) {
//     var value_champs = latexGenerator.statementToCode(block, 'Champs');
//     var statements_elements = latexGenerator.statementToCode(block, 'ensemble');
//     var code = '\\rho_{' + value_champs + ' }(' + statements_elements + ')';
//     return code;
// };
// latexGenerator['selection'] = function (block: any) {
//     var value_champs = latexGenerator.statementToCode(block, 'Champs');
//     var statements_elements = latexGenerator.statementToCode(block, 'ensemble');
//     var code = '\\sigma_{' + value_champs + '}(' + statements_elements + ')';
//     return code;
// };

// latexGenerator['projection'] = function (block: any) {
//     var value_champs = latexGenerator.statementToCode(block, 'Champs');
//     var statements_elements = latexGenerator.statementToCode(block, 'ensemble');
//     var code = '\\pi_{' + value_champs + ' }(' + statements_elements + ')';
//     return code;
// };

// latexGenerator['ensemble'] = function (block: any) {
//     var value_champs = latexGenerator.statementToCode(block, 'name');
//     var code = value_champs;
//     return code;
// };

// latexGenerator['text'] = function (block: any) {
//     const textValue = block.getFieldValue('TEXT');
//     const code = textValue.replace(/\\/g, '\\\\').replace(/\//g, '\\/').replace(/'/g, '\\\'').replace(/"/g, '\\"').replace(/_/g, '\\_');
//     return code;
// }

// latexGenerator['difference'] = function (block: any) {
//     var statements_elements1 = latexGenerator.statementToCode(block, 'ensemble1');
//     var statements_elements2 = latexGenerator.statementToCode(block, 'ensemble2');
//     var code = '(' + statements_elements1 + ') \\\\ (' + statements_elements2 + ')';
//     return code;
// }

// latexGenerator['intersection'] = function (block: any) {
//     var statements_elements1 = latexGenerator.statementToCode(block, 'ensemble1');
//     var statements_elements2 = latexGenerator.statementToCode(block, 'ensemble2');
//     var code = '(' + statements_elements1 + ') \\cup (' + statements_elements2 + ')';
//     return code;
// }

// latexGenerator['union'] = function (block: any) {
//     var statements_elements1 = latexGenerator.statementToCode(block, 'ensemble1');
//     var statements_elements2 = latexGenerator.statementToCode(block, 'ensemble2');
//     var code = '(' + statements_elements1 + ') \\cap (' + statements_elements2 + ')';
//     return code;
// }

// latexGenerator['produit'] = function (block: any) {
//     var statements_elements1 = latexGenerator.statementToCode(block, 'ensemble1');
//     var statements_elements2 = latexGenerator.statementToCode(block, 'ensemble2');
//     var code = '(' + statements_elements1 + ') \\times [' + statements_elements2 + ']';
//     return code;
// }

// latexGenerator['debut'] = function (block: any) {
//     var statements_elements = latexGenerator.statementToCode(block, 'suivant');
//     var code = statements_elements;
//     return code;
// }
// latexGenerator['jointure'] = function (block: any) {
//     var value_champs = latexGenerator.statementToCode(block, 'Champs');
//     var statements_elements1 = latexGenerator.statementToCode(block, 'ensemble1');
//     var statements_elements2 = latexGenerator.statementToCode(block, 'ensemble2');
//     var code = '(' + statements_elements1 + ') \\bowtie_{' + value_champs + '} (' + statements_elements2 + ')';
//     return code;
// };
// latexGenerator['division'] = function (block: any) {
//     var statements_elements1 = latexGenerator.statementToCode(block, 'ensemble1');
//     var statements_elements2 = latexGenerator.statementToCode(block, 'ensemble2');
//     var code = '(' + statements_elements1 + ') \\div (' + statements_elements2 + ')';
//     return code;
// };
/* -------------------------------------------------------------------------- */
/*                           FIN DU CUSTOM GENERATOR                          */
/* -------------------------------------------------------------------------- */


