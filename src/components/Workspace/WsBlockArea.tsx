import React from "react";

export default function WsBlockArea(prop: any) {
    var blocklyDivStyle = { height: 600, width: '100%' }
    return (
        <div id="blocklyArea" className='w-full'>
            <div id="blocklyDiv" style={blocklyDivStyle}></div>
        </div>
    )
}