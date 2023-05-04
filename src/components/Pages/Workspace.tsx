import React from 'react'
import { useLoaderData } from "react-router-dom";
import WsContent from '../Workspace/WsContent';
import { getCookie } from 'src/assets/tools/Utils';



export async function loader({ params } : any) {
    return params.workspaceId;
}

export default function Workspace() : JSX.Element {
    const workspace : any = useLoaderData();
    const token = getCookie("token");
    if (token === undefined || token === null || token === ""){
        window.location.href = "/signin";
        return <div></div>;
    }


    return (
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-light">
            <WsContent id={workspace}/>
        </div>
    )
}