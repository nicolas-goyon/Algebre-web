import React from "react";
import WsContent from "../Workspace/WsContent";
import Title from "../Utils/Title";

export function Playground() {
    return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-light">
        <Title title="Playground" />
        <WsContent noSave noLoad id={undefined} exerciceData={[]} exerciceId={undefined} noLoadData={true} noSaveData={true} />
    </div>
)};