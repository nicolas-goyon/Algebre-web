import React, { useState , useRef } from 'react';
import { Dialog, Disclosure, Popover } from '@headlessui/react'
import { v4 } from 'uuid';
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import ProfileDropDown from './Profile/ProfileDropDown';
import { DevWarning } from './Alertes/DevWarning';
import { getCookie } from 'src/assets/tools/Utils';

type MenuItemType = {
    name: string,
    href: string,
    current: boolean,
}

let menuTabs: Array<MenuItemType> = [
    { name: 'Exercices', href: '/exercices', current: true },
    { name: 'Playground', href: '/playground', current: false },
]

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes : String[]) {
  return classes.filter(Boolean).join(' ')
}






function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const loginButton = useRef(null)

    const token = getCookie("token");

    if (!(token === undefined || token === null || token === "")){
        menuTabs.push({ name: 'Workspaces', href: '/workspaces', current: false });
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
    <header className="bg-white border-b-2">
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
            { menuTabs.map((item) => {
            // Current underlined item
            let classeData = "text-sm font-semibold leading-6 text-gray-900";
            if (item.current){
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
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
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
                {/* <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50">
                        Product
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name + v4()}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a href="#" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Company
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#dsqs"
                  className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  ref={loginButton} 
                >
                  Log in
                </a> */}
                {
                    menuTabs.map((item) => {
                    
                        return (
                            <a href={item.href} className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" ref={loginButton} >
                                Log in
                            </a>
                        )
                })}
                
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* FIN si c'est sur tel */}
    </header>
  )
}
export default Header