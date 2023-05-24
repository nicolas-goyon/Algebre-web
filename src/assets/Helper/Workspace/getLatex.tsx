import { WorkspaceSvg } from "blockly";
import { getDebut } from "./getDebut";
import { javascriptGen } from "../Blockly/javascriptGen";
import { latexGenerator } from "../Blockly/latexGenerator";

export const getLatex = (wokspace : WorkspaceSvg) => {
    const baseBlock = getDebut(wokspace);
    if (baseBlock === null) {
        console.log("baseBlock doesn't exist");
        return;
    }
    var code = javascriptGen.blockToCode(baseBlock);
    var code = latexGenerator.blockToCode(baseBlock);
    return "code";
}