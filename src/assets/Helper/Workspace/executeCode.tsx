import { WorkspaceSvg } from "blockly";
import { getCode } from "./getCode";
import { transpile } from "typescript";
import Relation from "src/assets/classes/Relation";
import WorkspaceRelations from "src/assets/classes/WorkspaceRelation";

export const executeCode = (workspace : WorkspaceSvg) : Relation => {

    const code = getCode(workspace);
    try {
        const cleanCode = transpile(code);
        const resultat : Relation = Function('WorkspaceRelations', 'return ' + cleanCode )(WorkspaceRelations);
        console.log(resultat.getData());
        if (resultat === undefined || resultat === null || typeof resultat !== "object" || resultat.constructor.name !== "Relation")
            throw new Error("Erreur lors de l'execution du code");
        return resultat;
    } catch (error) {
        console.log(error);
        throw new Error("Erreur lors de l'execution du code");
    }
}