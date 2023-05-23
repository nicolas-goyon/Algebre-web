import { WorkspaceSvg, serialization } from "blockly";
import { api } from "src/assets/tools/ApiCenter";
import { config } from "src/config";

export const load = (workspace : WorkspaceSvg, id: number) => {
    api.get(config.apiUrl + '/workspace/' + id)
    .then((res) => {
        if (res.status !== 200) {
            return;
        }

        if (workspace === undefined) {
            return;
        }

        // load the workspace from JSON format
        const serializer = new serialization.blocks.BlockSerializer();
        let state = JSON.parse(res.response.workspace);
        workspace.clear();
        serializer.load(state, workspace);
        console.log("Workspace loaded");
    })
    .catch((err) => {
        console.log("Workspace not loaded");
        console.log(err);
    });
}