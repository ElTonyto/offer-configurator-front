import React, { useEffect } from "react"
import { Transition } from "@headlessui/react"

type Props = {
    title: string,
    showModal: any,
    show: boolean
}

const ModalTemplate: React.FC<Props> = ({ title, children, show, showModal }) => {
    const wrapperRef:any = React.createRef()

    if (show) {
        document.body.style.overflow = "hidden"
    }
    
    const closeModal = (event: Event) => {
        if (show) {
            if (wrapperRef && !wrapperRef.current.contains(event.target)) {
                showModal(false)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('mousedown', closeModal)
    
        return () => {
            window.removeEventListener('mousedown', closeModal) 
        }
    }, [closeModal])
    
    return (
        <Transition show={show}>
            <div className="justify-center items-start pt-40 bg-white bg-opacity-75 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <Transition.Child
                    enter="transition ease-in-out duration-500 transform"
                    enterFrom="scale-0 opacity-0"
                    enterTo="scale-100 opacity-100"
                    leave="transition ease-in-out duration-500 transform"
                    leaveFrom="scale-100 opacity-100"
                    leaveTo="scale-0 opacity-0"
                >
                    <div ref={wrapperRef} className="flex-auto w-xl my-6 max-w-lg shadow-lg">
                        <div className="px-3 border-0 rounded-lg shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/* header */}
                            <div className="p-2 py-2 flex justify-center items-center border-b border-solid border-gray-300 rounded-t">
                                <h3 className="w-full text-xl font-semibold text-center">{title}</h3>
                                <button
                                    className="ml-auto bg-transparent border-0 text-black float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => { showModal(false);  document.body.style.overflow = "visible" }}
                                >
                                    <span onClick={e => e.preventDefault()} className="bg-transparent text-black text-3xl outline-none focus:outline-none">×</span>
                                </button>
                            </div>
                            {/* content */}
                            {children}
                        </div>
                    </div>
                </Transition.Child>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </Transition>
    )
}

export default ModalTemplate
