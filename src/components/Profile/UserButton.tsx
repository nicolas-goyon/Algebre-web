import React, { useEffect, useRef, useState } from "react";

export default function UserButton(props: any) {
    const [etat, setEtat] = useState(false)
    const profileRef = useRef<HTMLButtonElement | null>(null);
    
    const navigation = [
        { title: "Dashboard", path: "#" },
        { title: "Settings", path: "#" },
        { title: "Log out", path: "/logout" },
    ]

    useEffect(() => {
        const handleDropDown = (e:any) => {
            if ( profileRef.current == null || ! profileRef.current.contains(e.target)) {
                setEtat(false)
            }
        }
        document.addEventListener('click', handleDropDown)
    }, [])

    return (
        <div className={`relative ${props.class}`}>
            <div className="flex items-center space-x-4">
                <button ref={profileRef} className="text-sm font-semibold leading-6 text-gray-900 outline-none inline-flex items-center space-x-2"
                    onClick={() => setEtat(!etat)}
                >
                    {props.pseudo}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>

                </button>
                {/* TODO : responsive */}
                <div className="lg:hidden">
                    <span className="block">{props.pseudo}</span>
                    <span className="block text-sm text-gray-500">{props.email}</span>
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