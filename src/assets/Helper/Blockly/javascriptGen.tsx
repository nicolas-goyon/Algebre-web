
import { javascriptGenerator } from 'blockly/javascript';

class SingletonJSGen {
    private static instance: any;
    private constructor() { }
    public static getInstance() {
        if (!SingletonJSGen.instance) {
            SingletonJSGen.instance = javascriptGenerator;
        }
        return SingletonJSGen.instance;
    }
}


/* -------------------------------------------------------------------------- */
/*                            JAVASCRIPT GENERATOR                            */
/* -------------------------------------------------------------------------- */
// Javascript generator for the relation block : TODO : make the code real javascript code ( not latex )


javascriptGenerator['renommage'] = function (block: any) {
    const value_champs = javascriptGenerator.statementToCode(block, 'Champs');
    const statements_elements = javascriptGenerator.statementToCode(block, 'ensemble');
    // var code = '\\rho_{' + value_champs + ' }(' + statements_elements + ')';
    let code = statements_elements;
    let champsTuples = value_champs.split(',');
    let champsDepart: string[] = [];
    let champsArrivee: string[] = [];
    champsTuples.forEach((champsTuple: string) => {
        let champs = champsTuple.split('=>');
        champsDepart.push(champs[0]);
        champsArrivee.push(champs[1]);
    });
    code += '.renameColumns(' + JSON.stringify(champsDepart) + ', ' + JSON.stringify(champsArrivee) + ')';
    return code;
};
javascriptGenerator['selection'] = function (block: any) {
    var value_champs = javascriptGenerator.statementToCode(block, 'Champs');
    var statements_elements = javascriptGenerator.statementToCode(block, 'ensemble');
    let code = statements_elements;
    let conditions: string[][] = [];
    let conditionLinks: string[] = [];
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

    let functionCheck = '(row: Record<string, any>) => { return ';
    conditions.forEach((condition: string[], index: number) => {
        functionCheck += 'row["' + condition[0] + '"] ' + condition[1] + ' ' + condition[2];
        if (index < conditions.length - 1) {
            functionCheck += ' ' + conditionLinks[index] + ' ';
        }
    });
    functionCheck += '; }';
    code += '.selectRowsWithCheck(' + functionCheck + ')';

    return code;
};


javascriptGenerator['projection'] = function (block: any) {
    var value_champs = javascriptGenerator.statementToCode(block, 'Champs', javascriptGenerator.ORDER_ADDITION);
    var statements_elements = javascriptGenerator.statementToCode(block, 'ensemble', javascriptGenerator.ORDER_ADDITION);
    let code = statements_elements;
    let champs = value_champs.split(',');
    code += '.selectColumns(' + JSON.stringify(champs) + ')';
    return code;
};
javascriptGenerator['ensemble'] = function (block: any) {
    var textValue = javascriptGenerator.statementToCode(block, 'name', javascriptGenerator.ORDER_ADDITION);
    let code = 'WorkspaceRelations.getTableByName("' + textValue + '")';
    return code;
};
javascriptGenerator['text'] = function (block: any) {
    const textValue = block.getFieldValue('TEXT');
    return textValue;
}
javascriptGenerator['difference'] = function (block: any) {
    var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
    var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
    let code = statements_elements1;
    code += '.difference(' + statements_elements2 + ')';
    return code;
}
javascriptGenerator['debut'] = function (block: any) {
    var statements_elements = javascriptGenerator.statementToCode(block, 'suivant');
    const code = statements_elements;
    return code;
}

javascriptGenerator['intersection'] = function (block: any) {
    var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
    var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
    let code = statements_elements1;
    code += '.intersection(' + statements_elements2 + ')';
    return code;
}

javascriptGenerator['union'] = function (block: any) {
    var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
    var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
    let code = statements_elements1;
    code += '.union(' + statements_elements2 + ')';
    return code;
}
javascriptGenerator['produit'] = function (block: any) {
    var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
    var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
    let code = statements_elements1;
    code += '.product(' + statements_elements2 + ')';
    return code;
}
javascriptGenerator['jointure'] = function (block: any) {
    var value_champs = javascriptGenerator.statementToCode(block, 'Champs');
    var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
    var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
    let code = statements_elements1;
    const joinCheck = 'function (row1: Record<string,any>, row2 Record<string,any>) { return ' + value_champs.split(',').map((champ: string) => 'row1[\'' + champ + '\'] == row2[\'' + champ + '\']').join(' && ') + '; }';
    code += '.join(' + statements_elements2 + ', ' + joinCheck + ')';
    return code;
};
javascriptGenerator['division'] = function (block: any) {
    var statements_elements1 = javascriptGenerator.statementToCode(block, 'ensemble1');
    var statements_elements2 = javascriptGenerator.statementToCode(block, 'ensemble2');
    let code = statements_elements1;
    code += '.division(' + statements_elements2 + ')';
    return code;
};
/* -------------------------------------------------------------------------- */
/*                          FIN JAVASCRIPT GENERATOR                          */
/* -------------------------------------------------------------------------- */

export const javascriptGen: any = SingletonJSGen.getInstance();