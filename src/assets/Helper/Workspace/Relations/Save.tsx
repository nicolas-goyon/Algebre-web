import Relation from "src/assets/classes/Relation";
import { api } from "../../../tools/ApiCenter";
import { config } from "../../../../config";

export const save = (relations: Relation[], id: string, callBackSuccess: ( res: any ) => any, callBackError: ( err: any ) => any) => {
    /* ----------------------------- SAVE RELATIONS ----------------------------- */
    relations.forEach((relation : Relation) => {
        const data = {
            "id": id,
            "content": JSON.stringify(relation),
            "name": relation.name
        }
        api.patch(config.apiUrl +'/relation/', data)
        .then(callBackSuccess)
        .catch(callBackError);
    });
}