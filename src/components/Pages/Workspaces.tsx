import React from "react";
import WsList from "../Workspace/WsList";
import { getCookie } from "src/assets/tools/Utils";



export default function Workspaces(prop: any) {
    const token = getCookie("token");
    if (token === undefined || token === null || token === ""){
        window.location.href = "/signin";
        return <div></div>;
    }
    return (
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-light">
            <div className="min-h-3xl w-auto mx-auto py-20 text-center">
                <h1 className="text-8xl font-mono">
                    Liste des espaces de travail
                </h1>
            </div>
            {/* Affichage d'un bouton pour créer un nouvel espace */}
            <div className="flex justify-center pb-10">
                <a href="/createWorkspace" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700">
                    Créer un nouvel espace
                </a>
            </div>

            {/* Affichage des différents workspaces avec une liste */}
            <WsList/>
        </div>
    )
}