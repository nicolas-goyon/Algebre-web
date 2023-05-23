import { Events, WorkspaceSvg } from "blockly";
import WorkspaceRelations from "src/assets/classes/WorkspaceRelation";
import { javascriptGen, sampleGenerator as LatexGenerator } from "src/assets/tools/initBlockly";

export const init = (workspace : WorkspaceSvg, updateCode: (event : Events.Abstract) => void, onresize: (e:any) => void) => {
    WorkspaceRelations.clearInstance();
    window.addEventListener('resize', onresize, false);
    javascriptGen.init(workspace);
    javascriptGen.INDENT = '';
    LatexGenerator.init(workspace);
    var x = 100.0;
    var y = 100.0;
    // Créer un bloc "base" et le placer au centre du workspace.
    var baseBlock = workspace.newBlock('debut');
    baseBlock.initSvg();
    baseBlock.setDeletable(false);
    baseBlock.setMovable(false);
    baseBlock.render();
    baseBlock.moveBy(x, y);
}
