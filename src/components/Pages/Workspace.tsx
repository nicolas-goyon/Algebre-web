import React from 'react'
import { useLoaderData } from "react-router-dom";
import WsContent from '../Workspace/WsContent';
export async function loader({ params } : any) {
    return params.workspaceId;
}

export default function Workspace() {
    const workspace : any = useLoaderData();
    return (
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-light">
            <WsContent id={workspace}/>
        </div>
    )
}