import { Dialog } from '@headlessui/react';
import { Fragment, useState } from 'react'


export default function AssetSelectionModal({ isOpen, closeModal }) {
    return (
        <div className={`fixed flex top-0 right-0 z-10 bg-black min-h-screen w-428
        justify-center items-center ${isOpen ? "visible bg-opacity-30" : "hidden bg-opacity-0"}`}>
            <div className='relative bg-white bg-opacity-100 border border-solid border-black z-20 flex-col'>
                <div className='flex w-full justify-end'>
                    <button
                        className='m-1 text-3xl'
                        onClick={closeModal}>
                        &times;
                    </button>
                </div>

                <div className='flex self-center justify-center content-center text-center w-full h-1/5 p-1 bg-gray-500'>
                    <div className='text-xl'>
                        <p>Title</p>
                    </div>
                </div>

                <div className='flex flex-1 w-80 h-4/5 p-1'>
                    <h1>Bodey content title</h1>
                    <p>body content</p>
                </div>
            </div>

        </div>
    );
}


// export default function AssetSelectionModal({ isOpen, closeModal }) {
//     return (
//         <Transition appear show={isOpen} as={Fragment}>
//             <Dialog
//                 as="div"
//                 className="overflow-y-auto"
//                 onClose={closeModal}
//             >
//                 <div className="min-h-screen px-4 text-center">
//                     <Transition.Child
//                         as={Fragment}
//                         enter="ease-out duration-300"
//                         enterFrom="opacity-0"
//                         enterTo="opacity-100"
//                         leave="ease-in duration-200"
//                         leaveFrom="opacity-100"
//                         leaveTo="opacity-0"
//                     >
//                         <Dialog.Overlay />
//                     </Transition.Child>

//                     {/* This element is to trick the browser into centering the modal contents. */}
//                     <span
//                         className="inline-block h-screen align-middle"
//                         aria-hidden="true"
//                     >
//                         &#8203;
//                     </span>
//                     <Transition.Child
//                         as={Fragment}
//                         enter="ease-out duration-300"
//                         enterFrom="opacity-0 scale-95"
//                         enterTo="opacity-100 scale-100"
//                         leave="ease-in duration-200"
//                         leaveFrom="opacity-100 scale-100"
//                         leaveTo="opacity-0 scale-95"
//                     >
//                         <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
//                             <Dialog.Title
//                                 as="h3"
//                                 className="text-lg font-medium leading-6 text-gray-900"
//                             >
//                                 Payment successful
//                             </Dialog.Title>
//                             <div className="mt-2">
//                                 <p className="text-sm text-gray-500">
//                                     Your payment has been successfully submitted. We’ve sent you
//                                     an email with all of the details of your order.
//                                 </p>
//                             </div>

//                             <div className="mt-4">
//                                 <button
//                                     type="button"
//                                     className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
//                                     onClick={closeModal}
//                                 >
//                                     Got it, thanks!
//                                 </button>
//                             </div>
//                         </div>
//                     </Transition.Child>
//                 </div>
//             </Dialog>
//         </Transition>
//     )
// }
