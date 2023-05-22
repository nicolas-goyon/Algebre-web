import React from "react";

export default function Title(prop: any) {
    return (
        <div className="min-h-2xl w-auto mx-auto py-20 text-center overflow-x-hidden">
            <h1 className="text-2xl lg:text-8xl font-mono">
                {prop.title}
            </h1>
        </div>
    )
}