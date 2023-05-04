import React from "react";
import WsContent from "../Workspace/WsContent";

export default function Playground() {
    return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-light">
        <div className="min-h-3xl w-auto mx-auto py-20 text-center">
            <h1 className="text-8xl font-mono">
                Bienvenue dans le Playground
            </h1>
        </div>
        <WsContent noSave noLoad />
    </div>
)};