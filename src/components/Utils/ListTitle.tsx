import React from "react";

export default function ListTitle(prop: any) {
    
      
    return(
    <div className="w-full m-h-10 bg-white rounded-lg shadow-lg align-middle cursor-pointer hover:border-black hover:border-3 hover:shadow-xl" onClick={ prop.handler }>
        <div className="flex flex-row justify-start">
            <div className="border-r-2 border-gray-300 p-3">
                <h1 className="text-5xl font-mono">
                    {prop.id}
                </h1>
            </div>
            <div className="w-1/2 m-h-10 my-auto ml-4">    
                <p className="text-xl font-mono">
                    {prop.title}
                </p>
            </div>
        </div>
    </div>
    )
}