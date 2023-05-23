import { WorkspaceSvg, Block } from "blockly";

export const getDebut = ( workspace: WorkspaceSvg ): Block | null => {
    // get blocs that have no parent
    var topBlocks = workspace.getTopBlocks(false);
    var baseBlock = null;
    // Trouve le bloc "debut".   

    for (var i = 0; i < topBlocks.length; i++) {
        if (topBlocks[i].type === 'debut') {
            baseBlock = topBlocks[i];
            break;
        }
    }
    return baseBlock;
}