import React from "react";
import ListTitle from "../Utils/ListTitle";
import { api } from "src/assets/tools/ApiCenter";
import { config } from "src/config";


export default function WsListComponent(prop: any) {
    const deleteHandler = (e: any) => {
        e.stopPropagation();
        api.delete(config.apiUrl + "/workspace/" + prop.id, null)
        .then((res) => {
            if(res.status === 200) {
                window.location.href = "/workspaces";
            }
        })
        .catch((err) => {
            alert(err);
        })
    }
    let title = prop.title;
    if(title === '' && title.length === 0){
        title = 'Workspace sans titre';
    }
    
    return(
        <ListTitle id={"#"+prop.id} title={title} handler={()=>(window.location.href = '/workspaces/'+prop.id)} deleteHandler={deleteHandler}/>
    )
}