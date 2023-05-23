import React from "react"
import { WsData } from "src/assets/Types/WsData"
import Table from "../Utils/Table"

export default function WsDataArea(prop: any) {
    return (
        <>
            {/* Tableau de données */}
            <div id="dataArea" className='flex justify-center'>
                <div id="inputArea" className='w-2/3'>
                    {prop.inputArray.map((input: WsData, index: number) => (
                        <Table key={index} columnNames={input.columnNames} data={input.data} title={input.title} isShrinkable={input.isShrinkable} />
                    ))}
                </div>
                <div id="resultArea" className='w-1/3'>
                    <Table columnNames={prop.resultTable.columnNames} data={prop.resultTable.data} title={prop.resultTable.title} isShrinkable={prop.resultTable.isShrinkable} />
                </div>
            </div>
        </>
    )
}