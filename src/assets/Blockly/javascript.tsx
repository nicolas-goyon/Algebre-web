import { javascriptGenerator } from 'blockly/javascript';

export const javascriptGen: any = javascriptGenerator;


/* -------------------------------------------------------------------------- */
/*                            JAVASCRIPT GENERATOR                            */
/* -------------------------------------------------------------------------- */
// Javascript generator : Not javascript but JSON Object


javascriptGenerator['renommage'] = function (block: any) {
    const value_champs = javascriptGenerator.statementToCode(block, 'Champs');
    const statements_elements = javascriptGenerator.statementToCode(block, 'ensemble');
    const code = "\"operation\" : \"Renommage\", " +
                    "\"relation\" : {" + statements_elements + "}, " +
                    "\"champs\" : \"" + value_champs + "\"";    
    return code;
};
javascriptGenerator['selection'] = function (block: any) {
    var value_champs = javascriptGenerator.statementToCode(block, 'Champs');
    var statements_elements = javascriptGenerator.statementToCode(block, 'ensemble');
    const code = "\"operation\" : \"Selection\", " +
                    "\"relation\" : {" + statements_elements + "}, " +
                    "\"champs\" : \"" + value_champs + "\"";
    return code;
};


javascriptGenerator['projection'] = function (block: any) {
    var value_champs = javascriptGenerator.statementToCode(block, 'Champs', javascriptGenerator.ORDER_ADDITION);
    var statements_elements = javascriptGenerator.statementToCode(block, 'ensemble', javascriptGenerator.ORDER_ADDITION);
    const code = "\"operation\" : \"Projection\", " +
                    "\"relation\" : {" + statements_elements + "}, " +
                    "\"champs\" : \"" + value_champs + "\"";
    return code;
};
javascriptGenerator['ensemble'] = function (block: any) {
    var textValue = javascriptGenerator.statementToCode(block, 'name', javascriptGenerator.ORDER_ADDITION);
    const code = "\"operation\" : \"Relation\", " +
                    "\"nom\" : \"" + textValue + "\"";
    return code;
};
javascriptGenerator['text'] = function (block: any) {
    const textValue = block.getFieldValue('TEXT');
    return textValue;
}
javascriptGenerator['difference'] = function (block: any) {
    var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
    var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
    const code = "\"operation\" : \"Difference\", " +
                    "\"relation1\" : {" + statements_elements1 + "}, " +
                    "\"relation2\" : {" + statements_elements2 + "}";
    return code;
}
javascriptGenerator['debut'] = function (block: any) {
    var statements_elements = javascriptGenerator.statementToCode(block, 'suivant');
    const code = statements_elements;
    return "{" +code + "}";
}

javascriptGenerator['intersection'] = function (block: any) {
    var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
    var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
    const code = "\"operation\" : \"Intersection\", " +
                    "\"relation1\" : {" + statements_elements1 + "}, " +
                    "\"relation2\" : {" + statements_elements2 + "}";
    return code;
}

javascriptGenerator['union'] = function (block: any) {
    var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
    var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
    const code = "\"operation\" : \"Union\", " +
                    "\"relation1\" : {" + statements_elements1 + "}, " +
                    "\"relation2\" : {" + statements_elements2 + "}";
    return code;
}
javascriptGenerator['produit'] = function (block: any) {
    var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
    var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
    const code = "\"operation\" : \"Produit\", " +
                    "\"relation1\" : {" + statements_elements1 + "}, " +    
                    "\"relation2\" : {" + statements_elements2 + "}";
    return code;
}
javascriptGenerator['jointure'] = function (block: any) {
    var value_champs = javascriptGenerator.statementToCode(block, 'Champs');
    var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
    var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
    const code = "\"operation\" : \"Jointure\", " +
                    "\"relation1\" : {" + statements_elements1 + "}, " +
                    "\"relation2\" : {" + statements_elements2 + "}, " +
                    "\"champs\" : \"" + value_champs + "\"";
    return code;
};
javascriptGenerator['division'] = function (block: any) {
    var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
    var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
    const code = "\"operation\" : \"Division\", " +
                    "\"relation1\" : {" + statements_elements1 + "}, " +
                    "\"relation2\" : {" + statements_elements2 + "}";
    return code;
};
    /* -------------------------------------------------------------------------- */
/*                          FIN JAVASCRIPT GENERATOR                          */
/* -------------------------------------------------------------------------- */


