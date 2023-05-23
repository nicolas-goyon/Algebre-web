import { WorkspaceSvg } from "blockly";
import { getDebut } from "./getDebut";
import {  sampleGenerator as LatexGenerator } from 'src/assets/tools/initBlockly';

export const getLatex = (wokspace : WorkspaceSvg) => {
    const baseBlock = getDebut(wokspace);
    if (baseBlock === null) {
        console.log("baseBlock doesn't exist");
        return;
    }
    var code = LatexGenerator.blockToCode(baseBlock);
    return code;
}