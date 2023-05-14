import React from 'react'
import { getCookie } from 'src/assets/tools/Utils';
import WsContent from '../Workspace/WsContent';

export default function CreateWorkspace() : JSX.Element {
    const token = getCookie("token");
    if (token === undefined || token === null || token === ""){
        window.location.href = "/signin";
        return <div></div>;
    }
    return (
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-light">
            <WsContent noLoad />
        </div>
    )
}