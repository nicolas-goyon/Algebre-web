import React from 'react'
import { getCookie } from '../../assets/tools/Utils';
import { config } from '../../config.js'
import { api } from '../../assets/tools/ApiCenter';


export function CreateWorkspace(): JSX.Element {
    const token = getCookie("token");
    if (token === undefined || token === null || token === "") {
        window.location.href = "/signin";
        return <div></div>;
    }

    api.post(config.apiUrl + "/workspace", {})
        .then((response) => {
            console.log(response);
            window.location.href = "/workspaces/" + response.response.id;
        }).catch((error) => {
            console.log(error);
        });



    // TODO : créer un workspace à partir de l'api et rediriger vers la page du workspace
    // FIXME : ne pas afficher de contenu de workspace
    return (<></>)
}