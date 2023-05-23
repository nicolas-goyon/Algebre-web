import React, { useState , useRef } from 'react';
import { Dialog, Popover } from '@headlessui/react'
import { v4 } from 'uuid';
import { Bars3Icon, CogIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import ProfileDropDown from '../Profile/ProfileDropDown';
import { DevWarning } from '../Alertes/DevWarning';
import { getCookie } from '../../assets/tools/Utils';

type MenuItemType = {
    name: string,
    href: string,
    current: boolean,
}


export default function Navbar(props: any) {
    let menuTabs: Array<MenuItemType> = [
        { name: 'Exercices', href: '/exercices', current: true },
        { name: 'Playground', href: '/playground', current: false },
    ]
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const loginButton = useRef(null)

    const token = getCookie("token");

    if (!(token === undefined || token === null || token === "")){
        // check if menuTabs.push({ name: 'Workspaces', href: '/workspaces', current: false }); is not already present
        let found = false;
        menuTabs.forEach((item) => {
            if (item.name === "Workspaces"){
                found = true;
            }
        });
        if (!found){
            menuTabs.push({ name: 'Workspaces', href: '/workspaces', current: false });
        }
    }

    // get the current page
    let currentPath: string = window.location.pathname;
    // get the first part of the path
    currentPath = currentPath.split("/")[1];
    menuTabs.forEach((item) => {
        if (item.href === ("/" + currentPath)){
            item.current = true;
        }
        else{
            item.current = false;
        }
    });
    return (
        <>
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    {menuTabs.map((item) => {
                        // Current underlined item
                        let classeData = "text-sm font-semibold leading-6 text-gray-900";
                        if (item.current) {
                            classeData += " border-b-2 border-indigo-500";
                        }



                        return (
                            <a href={item.href} key={v4()} className={classeData}>
                                {item.name}
                            </a>
                        )
                    })}
                </Popover.Group>
                {/*  */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <ProfileDropDown
                        class="hidden lg:block"
                        loginButton={loginButton}
                    />
                </div>
            </nav>
            <DevWarning />
            {/* SI c'est sur tel */}
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Algebre</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {
                                    menuTabs.map((item) => {
                                        return (
                                            <a href={item.href} className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" ref={loginButton} >
                                                {item.name}
                                            </a>
                                        )
                                    })}
                                {/* Insert here */}
                                <div className="py-6">
                                    <div className="flex items-center space-x-4 px-4">
                                        <div className="flex-shrink-0">
                                            <UserCircleIcon className="h-10 w-10 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">Jean</p>
                                            <p className="text-sm font-medium text-gray-500 truncate">Jack@gmail.com</p>
                                        </div>
                                        <div>
                                            <button className="bg-gray-100 rounded-full p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                                <span className="sr-only">Settings</span>
                                                <CogIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <a href="/logout" className="block text-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Log out
                                        </a>
                                    </div>
                                </div>
                                {/* <ProfileDropDown onPhone={true} /> */}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
            {/* FIN si c'est sur tel */}
        </>
    )
}