import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { Transition } from "@headlessui/react"

const Header: React.FC = () => {
    const history = useHistory()
    const location = useLocation()
    const [navbarOpen, setNavbarOpen] = useState<boolean>(false)
    const [pathname, setPathname] = useState<string>(location.pathname)

    useEffect(() => {
        if (navbarOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [navbarOpen])


    useEffect(() => {
        setPathname(location.pathname)
    }, [location])


    return (
        <nav className="w-full bg-white shadow-lg fixed z-50">
            <div className="sm:container sm:py-0 sm:flex items-center justify-between w-full lg:w-7/12">
                <div className="relative flex items-center justify-between w-full z-50">
                    <div className="absolute inset-y-0 flex items-center sm:hidden">
                        <button type="button" onClick={() => setNavbarOpen(!navbarOpen) } className="inline-flex items-center justify-center m-2 p-2 rounded-md text-black-400 hover:bg-gray-100 focus:outline-none focus:bg-white focus:ring-inset focus:ring-black" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className={`${navbarOpen ? "hidden" : "block"} h-9 w-9`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className={`${navbarOpen ? "block" : "hidden"} h-9 w-9`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:justify-start bg-white">
                        <div onClick={() => { history.push('/') }} className="flex-shrink-0 flex items-center cursor-pointer py-3">
                            <h1 className="text-xl font-medium">Configurateur d'offre</h1>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="ml-3 relative">
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-1 h-16">
                                    <div onClick={() => { history.push('/') }} className={`${(pathname === "/") ? "text-gray-800 border-blue-500" : "text-gray-600 border-white hover:border-blue-500 hover:border-opacity-70" } border-b-2 px-5 py-5 text-lg font-medium cursor-pointer`}>
                                        <p>Accueil</p>
                                    </div>
                                    <div onClick={() => { history.push('/catalogs') }} className={`${(pathname.includes("/catalogs")) ? "text-gray-800 border-blue-500" : "text-gray-600 border-white hover:border-blue-500 hover:border-opacity-70" } border-b-2 px-5 py-5 text-lg font-medium cursor-pointer`}>
                                        <p>Catalogue</p>
                                    </div>
                                    <div onClick={() => { history.push('/offers') }} className={`${(pathname.includes("/offers")) ? "text-gray-800 border-blue-500" : "text-gray-600 border-white hover:border-blue-500 hover:border-opacity-70" } border-b-2 px-5 py-5 text-lg font-medium cursor-pointer`}>
                                        <p>Offre</p>
                                    </div>
                                    <div onClick={() => { history.push('/products') }} className={`${(pathname.includes("/products")) ? "text-gray-800 border-blue-500" : "text-gray-600 border-white hover:border-blue-500 hover:border-opacity-70" } border-b-2 px-5 py-5 text-lg font-medium cursor-pointer`}>
                                        <p>Produit</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Transition show={navbarOpen} className="absolute w-full h-full">
                <div className={`sm:hidden bg-gray-500 bg-opacity-40 z-40 w-full header-dropdown`} onClick={() => { setNavbarOpen(false) }} id="mobile-menu">
                    <Transition.Child
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-y-full"
                        enterTo="translate-y-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-y-0"
                        leaveTo="-translate-y-full"
                    >
                        <div>
                            <div className={`sm:hidden bg-white shadow-lg`} id="mobile-menu">
                                <div className="px-2 pb-2 space-y-1">
                                    <div onClick={() => { history.push('/'); setNavbarOpen(false) }} className={`${(pathname === "/") ? "border-blue-500 bg-blue-500 bg-opacity-25 text-blue-500" : "text-gray-500 border-white hover:text-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:bg-opacity-10" } border-l-4 text-lg px-3 py-2 font-medium cursor-pointer`}>
                                        <p>Accueil</p>
                                    </div>
                                    <div onClick={() => { history.push('/catalogs'); setNavbarOpen(false) }} className={`${(pathname.includes("/catalogs")) ? "border-blue-500 bg-blue-500 bg-opacity-25 text-blue-500" : "text-gray-500 border-white hover:text-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:bg-opacity-10" } border-l-4 text-lg px-3 py-2 font-medium cursor-pointer`}>
                                        <p>Catalogue</p>
                                    </div>
                                    <div onClick={() => { history.push('/offers'); setNavbarOpen(false) }} className={`${(pathname.includes("/offers")) ? "border-blue-500 bg-blue-500 bg-opacity-25 text-blue-500" : "text-gray-500 border-white hover:text-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:bg-opacity-10" } border-l-4 text-lg px-3 py-2 font-medium cursor-pointer`}>
                                        <p>Offre</p>
                                    </div>
                                    <div onClick={() => { history.push('/products'); setNavbarOpen(false) }} className={`${(pathname.includes("/products")) ? "border-blue-500 bg-blue-500 bg-opacity-25 text-blue-500" : "text-gray-500 border-white hover:text-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:bg-opacity-10" } border-l-4 text-lg px-3 py-2 font-medium cursor-pointer`}>
                                        <p>Produit</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Transition>
        </nav>
    )
}

export default Header
