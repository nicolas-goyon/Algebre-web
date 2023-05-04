import React from "react";
import WsList from "../Workspace/WsList";



export default function Workspaces(prop: any) {

    return (
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-light">
            <div className="min-h-3xl w-auto mx-auto py-20 text-center">
                <h1 className="text-8xl font-mono">
                    Liste des espaces de travail
                </h1>
            </div>
            {/* Affichage des différents workspaces avec une liste */}
            <WsList/>
        </div>
    )
}