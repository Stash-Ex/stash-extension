import React, { useEffect } from "react";

export default function Modal({ isOpen, closeModal, title, children, action }) {
    useEffect(() => {

        const closeOnEscapeKeyDown = (e) => {
            if ((e.charCode | e.keyCode) === 27) {
                closeModal()
            }
        }
        document.body.addEventListener('keydown', closeOnEscapeKeyDown)
        return function cleanup() {
            document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
        }

    }, [closeModal])

    return (
        <div
            className={`fixed flex top-0 right-0 left-0 bottom-0 z-10 bg-black min-h-screen w-428 
            justify-center items-center bg-opacity-30 opacity-0 transition-all ease-in-out duration-300 pointer-events-none
            ${isOpen ? "opacity-100 pointer-events-auto" : ""}`}
            onClick={closeModal}>
            <div
                className={`w-4/5 bg-white bg-opacity-100 border border-solid border-black rounded-lg z-20 flex-col
                 transition-all ease-in-out duration-300 -translate-y-52 ${isOpen ? "translate-y-0" : ""}`}
                onClick={e => e.stopPropagation()}>
                <div className='p-2'>
                    <h4 className='m-0'>{title}</h4>
                </div>
                <div className='p-2 border-t border-b border-solid border-gray-300'>
                    {children}
                </div>
                <div className='p-2'>
                    {action}
                </div>
            </div>

        </div>
    );
}