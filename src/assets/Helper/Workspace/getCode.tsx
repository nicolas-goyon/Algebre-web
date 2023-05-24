import { WorkspaceSvg } from "blockly";
import { getDebut } from "./getDebut";
import { javascriptGen } from "../Blockly/javascriptGen";

export const getCode = (wokspace : WorkspaceSvg) => {
    const debut = getDebut(wokspace);
    var code = javascriptGen.blockToCode(debut);
    return code;
}