import React from "react";
import ListTitle from "../Utils/ListTitle";

export default function WsListComponent(prop: any) {
    
    
    return(
        <ListTitle id={"#"+prop.id} title={prop.title} handler={()=>(window.location.href = '/workspaces/'+prop.id)}/>
    )
}