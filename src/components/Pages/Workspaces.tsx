import React from "react";
import WsList from "../Workspace/WsList";
import { getCookie } from "src/assets/tools/Utils";
import Title from "../Utils/Title";



export function Workspaces(prop: any) {
    const token = getCookie("token");
    if (token === undefined || token === null || token === ""){
        window.location.href = "/signin";
        return <div></div>;
    }
    return (
        <>
            <Title title="Workspaces" />
            {/* Affichage d'un bouton pour créer un nouvel espace */}
            <div className="flex justify-center pb-10">
                <a href="/createWorkspace" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700">
                    Créer un nouvel espace
                </a>
            </div>

            {/* Affichage des différents workspaces avec une liste */}
            <WsList/>
        </>
    )
}