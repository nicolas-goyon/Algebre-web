import { api } from 'src/assets/tools/ApiCenter';
import { getCookie } from 'src/assets/tools/Utils';
import { config } from 'src/config';
import React, { useEffect, useRef, useState } from 'react';

// Profile Dropdown
export const ProfileDropDown = (props: any) => {
    const navigation = [
        { title: "Dashboard", path: "#" },
        { title: "Settings", path: "#" },
        { title: "Log out", path: "/logout" },
    ]


    const [etat, setEtat] = useState(false)
    const [rendered, setRendered] = useState(false)
    const profileRef = useRef<HTMLButtonElement | null>(null);

    const [info, setInfo] = useState(
        completeUserInfo("Pseudo", "Email")
   )
    
    useEffect(() => {
        const handleDropDown = (e:any) => {
            console.log("clicked");
            if ( profileRef.current == null || ! profileRef.current.contains(e.target)) {
                console.log("clicked outside");
                setEtat(false)
            }
        }
        document.addEventListener('click', handleDropDown)
        setEtat(true)
        // if (!rendered) {
        //     setRendered(true)
        //     const token = getCookie("token");
        //     if (token !== "") {
        //         api.get(config.apiUrl + "/users/me").then((res) => {
        //             console.log("Ok");
        //             console.log(res.response);
        //             let pseudo = res.response.pseudo;
        //             let email = res.response.email;
        //             setInfo(completeUserInfo(pseudo, email));
        //         }).catch((err) => {
        //             console.log(err);
        //         });
        //     }
        //     else {
        //         console.log("token not present ");
        //     }
        // }
    }, [])




    function completeUserInfo(pseudo: String, email: String){
        return (
            <div className={`relative ${props.class}`}>
                <div className="flex items-center space-x-4">
                    <button ref={profileRef} className="text-sm font-semibold leading-6 text-gray-900 outline-none inline-flex items-center space-x-2"
                        onClick={() => {
                            console.log("clicked on profile");
                            console.log(etat)
                            setEtat(etat => !etat)
                        }}
                    >
                        {pseudo}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
    
                    </button>
                    {/* TODO : responsive */}
                    <div className="lg:hidden">
                        <span className="block">{pseudo}</span>
                        <span className="block text-sm text-gray-500">{email}</span>
                    </div>
                </div>
                <ul className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${etat ? '' : 'lg:hidden'}`}>
                    {
                        navigation.map((option,index) =>{return (
                            <li>
                                <a key={ index } className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5" href={option.path}>
                                    {option.title}
                                </a>
                            </li>
                        )})
                    }
                </ul>
            </div>
        )
    }


    
    return (info);
}

