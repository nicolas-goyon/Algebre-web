import React from "react";
import type { TWsData } from "../../assets/classes/TWsData";
import Table from "../Utils/Table";

export default function WsData(prop: {inputArray: TWsData[], resultTable: TWsData}) {
    return (
        <>
            {/* Tableau de données */}
            {/* Deux colonnes, l'une faisant 2/3 et l'autre 1/3 : plusieurs tables les unes au dessus des autres avec un titre dans la première et qu'une seule table avec le titre résultat dans la seconde */}
            <div id="dataArea" className='flex justify-center'>
                <div id="inputArea" className='w-2/3'>
                    {prop.inputArray.map((input:any, index: number) => (
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