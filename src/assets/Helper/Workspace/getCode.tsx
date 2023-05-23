import { WorkspaceSvg } from "blockly";
import { getDebut } from "./getDebut";
import {  javascriptGen } from 'src/assets/tools/initBlockly';

export const getCode = (wokspace : WorkspaceSvg) => {
    const debut = getDebut(wokspace);
    var code = javascriptGen.blockToCode(debut);
    return code;
}