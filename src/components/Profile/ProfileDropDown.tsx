import { api } from 'src/assets/tools/ApiCenter';
import { getCookie } from 'src/assets/tools/Utils';
import { config } from 'src/config';
import React, { useEffect, useState } from 'react';
import UserButton from './UserButton';



// Profile Dropdown
export default function ProfileDropDown(props: any){

    // const [rendered, setRendered] = useState(false)

    const [info, setInfo] = useState(
        <a href="/signin" ref={props.loginButton} id="login-button" className="text-sm font-semibold leading-6 text-gray-900">
            Sign in <span aria-hidden="true">&rarr;</span>
          </a>
   )

    async function getUserInfo(){
        const token = getCookie("token");
        if (token === undefined || token === null || token === ""){
            console.log("token not present ");
            return;
        }
        
        await api
        .get(config.apiUrl + "/users/me")
        .then((res) => {
            console.log("users me Ok status ");
            if (res.status === 401)
                return;
            
            let pseudo = res.response.pseudo;
            let email = res.response.email;
            setInfo( <UserButton pseudo={pseudo} email={email} class="hidden lg:block" /> )
        }).catch((err) => {
            console.log(err);
        });
    }
    
    useEffect(() => {
        getUserInfo();
    }, [])
    
    return (info);
}

