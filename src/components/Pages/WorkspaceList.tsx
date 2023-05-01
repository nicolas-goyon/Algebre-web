import React, { useEffect, useState } from "react";
import { api } from "src/assets/tools/ApiCenter";
import { getCookie } from "src/assets/tools/Utils";
import { config } from "src/config";


export default function WorkspaceList(prop: any) {
    const [list, setList] = useState<{id:string, title:string}[]>([]);

    useEffect( () => {
        const token = getCookie("token");
            if (token !== "") {
                api.get(config.apiUrl + "/workspaces/all").then((res) => {
                    console.log("users me Ok status ");
                    if (res.status === 401)
                        return;
                    let data : {id:string, title:string}[] = [];
                    res.response.map((item: any) => {
                        data.push({id: item.id, title: item.title});
                    })
                }).catch((err) => {
                    console.log(err);
                });
            }
    })

    return (
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-light">
            <div className="min-h-3xl w-auto mx-auto py-20 text-center">
                <h1 className="text-8xl font-mono">
                    Liste des espaces de travail
                </h1>
            </div>
            {/* Affichage des différents workspaces avec une liste */}
            <div id="WorkspaceList" className="flex flex-wrap justify-center">
                {list.length > 0 ? 
                    list.map((item, index) => <WorkspaceList id={item.id} title={item.title} key={index}/>)
                    : 
                    <div className="w-full m-h-10 align-middle flex flex-row justify-center">
                        <h1 className="text-5xl font-mono">
                            Aucun expace de travail enregistrés
                        </h1>
                    </div>
                }
                
            </div>
                
        </div>
    )
}