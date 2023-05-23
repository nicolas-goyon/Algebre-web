import React from 'react';


export default function WsButtons(prop: any) {
    return (
        <>
            {/* Save button */}
            {prop.noSave === undefined || prop.noSave === false ?
                <>
                    <div className='flex justify-center'>
                        <button id="saveButton" className={prop.btnClass} onClick={prop.saveWorkspace}>Save Workspace</button>
                    </div>
                    <div className='flex justify-center'>
                        <button id="saveButton" className={prop.btnClass} onClick={prop.saveRelations}>Save Relations</button>
                    </div>
                </>
                : null
            }
            {/* Execute button */}
            <div className='flex justify-center'>
                <button id="executeButton" className={prop.btnClass} onClick={prop.exec}>Execute</button>
            </div>
        </>
    )

}