import React  from 'react';
import { api } from '../../assets/tools/ApiCenter';
import { getCookie } from '../../assets/tools/Utils';
import { config } from '../../config';

export function Logout(prop: any) {
    const token = getCookie("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    if(token === undefined || token === null || token === ""){
        window.location.href = '/';
        return (<div></div>);
    }

    api.get(config.apiUrl + "/auth/logout")
    .then((res) => {
        console.log("Log out Ok");
    }).catch((err) => {
        console.log(err);
    });
    window.location.href = '/';


    return (
        <div>
            Logout
        </div>
    )
    
} 