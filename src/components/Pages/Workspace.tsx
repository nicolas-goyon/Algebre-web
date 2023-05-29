import React from 'react'
import { useLoaderData } from "react-router-dom";
import WsContent from '../Workspace/WsContent';
import { getCookie } from 'src/assets/tools/Utils';



export async function loader({ params }: any) {
    return params.workspaceId;
}

export function Workspace(): JSX.Element {
    const titreRef = React.useRef<HTMLDivElement>(null);
    const workspace: any = useLoaderData();
    const token = getCookie("token");
    if (token === undefined || token === null || token === "") {
        window.location.href = "/signin";
        return <div></div>;
    }


    return (
        <>
            <WsContent id={workspace as number} noSave={false} exerciceData={[]} exerciceId={undefined} noLoad={undefined} noLoadData={undefined} noSaveData={undefined} />
        </>
    )
}