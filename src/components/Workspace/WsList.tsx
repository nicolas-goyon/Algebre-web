import React, { useEffect, useState } from "react";
import { api } from "src/assets/tools/ApiCenter";
import { getCookie } from "src/assets/tools/Utils";
import { config } from "src/config";
import WsListComponent from "./WsListComponent";




export default function WsList(prop: any) {
    const noWorkspace = (
        <div id="WorkspaceList" className="flex flex-wrap justify-center">
            <div className="w-full m-h-10 align-middle flex flex-row justify-center">
                <h1 className="text-5xl font-mono">
                    Aucun expace de travail enregistrés
                </h1>
            </div>
        </div>
    )
    const [data, setData] = useState(noWorkspace)
    const [first, setFirst] = useState<boolean>(false);

    useEffect( () => {
        console.log(first);
        if (!first) {
            setFirst(true);
            const token = getCookie("token");
            if (token !== "") {
                api.get(config.apiUrl + "/workspace/all")
                .then((res) => {
                    console.log("Récupération des workspaces ok");
                    processRequestSuccess(res);
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
        
    }, [])

    function processRequestSuccess(res : any){
        if (res.status === 401)
        return;



        let dataRaw : {id:string, title:string}[] = [];
        console.log(res.response);
        dataRaw = res.response.map((item: any) => (
                    {id: item.id, title: item.title}
                ))
        console.log(dataRaw);
        let newData = (
            <div id="WorkspaceList" className="flex flex-wrap justify-center gap-4">
                {dataRaw.map((item, index) => (<WsListComponent id={item.id} title={item.title} key={index}/>))}
            </div>
        )
        
        setData(newData); 
        
    }
    return (data);
}