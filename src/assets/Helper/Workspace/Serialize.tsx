import { WorkspaceSvg, serialization } from "blockly";
import { getDebut } from "./getDebut";

export const serialize = (workspace: WorkspaceSvg) => {
    const baseBlock = getDebut(workspace);
    // Si le bloc "base" est trouvé, récupère le premier bloc enfant et commence la compilation à partir de là.
    const serializer = new serialization.blocks.BlockSerializer();
    const state = serializer.save(workspace!);
    return state
}