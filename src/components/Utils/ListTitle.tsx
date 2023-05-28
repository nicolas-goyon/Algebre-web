import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function ListTitle(prop: any) {
    let deleteButton = ( <></>)
    if (prop.deleteHandler !== undefined) {
        deleteButton = (
            <button className="flex flex-row justify-end" onClick={prop.deleteHandler}>
                <TrashIcon className="w-6 h-6 m-auto mr-6 text-red-500" />
            </button>
        )
    }


    return (
        <div className="w-full m-h-10 bg-white rounded-lg shadow-lg align-middle cursor-pointer hover:border-black hover:border-3 hover:shadow-xl flex flex-row justify-between" onClick={prop.handler}>
            <div className="flex flex-row justify-start w-1/2">
                <div className="border-r-2 border-gray-300 p-3">
                    <h1 className="text-5xl font-mono">
                        {prop.id}
                    </h1>
                </div>
                <div className="m-h-10 my-auto ml-4">
                    <p className="text-xl font-mono">
                        {prop.title}
                    </p>
                </div>
            </div>
            {deleteButton}
        </div>
    )
}