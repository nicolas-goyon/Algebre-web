import { WorkspaceSvg, inject } from "blockly";
import { options } from "src/assets/tools/initBlockly";

export const create = (setBlockWorkspace: (blockWorkspace: WorkspaceSvg) => void) => {
    setBlockWorkspace( inject(
        'blocklyDiv',
        options
    ))
}