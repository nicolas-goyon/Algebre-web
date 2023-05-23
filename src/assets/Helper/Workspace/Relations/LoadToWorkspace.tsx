import Relation from "../../../classes/Relation";
import { api } from "../../../tools/ApiCenter";
import { config } from "../../../../config.js";
import WorkspaceRelations from "../../../classes/WorkspaceRelation";

export const loadToWorkspace = (id: string, setInputArray: (inputArray: any[]) => void) => {
    // Request api to load the relations
    api.get(config.apiUrl + '/relation/' + id)
        .then((res) => {
            if (res.status !== 200) {
                return;
            }
            let newInputArray: any[] = [];
            WorkspaceRelations.clearInstance();
            const relations = res.response.relations
            relations.forEach((relation: any) => {
                console.log(relation);
                const relationParse = JSON.parse(relation.content);
                const headers = relationParse.columnNames;
                const name = relation.name;
                const data = relationParse.data

                const newRelation = new Relation(name, data, headers);
                WorkspaceRelations.addTable(newRelation);

                const myData = {
                    title: name,
                    data: newRelation.getData(),
                    columnNames: newRelation.getColumnNames(),
                    isShrinkable: true,
                }

                newInputArray.push(myData);
            });
            setInputArray(newInputArray);
        })
        .catch((err) => {
            console.log("Relations not loaded");
            console.log(err);
        });

}