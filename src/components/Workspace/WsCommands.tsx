import React from "react";
import CsvInput from "../Input/CsvInput";

export default function WsCommands( prop : any) {

    return (
        <>
            {/* Save button */}
            {prop.noSave === undefined || prop.noSave === false ?
                <>
                    <div className='flex justify-center'>
                        <button id="saveButton" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-500 ease-in-out' onClick={prop.saveWorkspace}>Save Workspace</button>
                    </div>
                    <div className='flex justify-center'>
                        <button id="saveButton" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-500 ease-in-out' onClick={prop.saveRelations}>Save Relations</button>
                    </div>
                </>
            : null
            }
            {/* Execute button */}
            <div className='flex justify-center'>
                <button id="executeButton" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-500 ease-in-out' onClick={prop.executeCode}>Execute</button>
            </div>
            {/* Zone d'ajout de fichier csv pour ajouter de nouveaux tableaux */}
            <div className='flex justify-center'>
                <div className='w-2/3'>
                    <CsvInput callBack={prop.addTableau}/>
                </div>
            </div>
        </>
    )
}