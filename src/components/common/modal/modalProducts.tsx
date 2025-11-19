import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import BtnClose from '../buttons/BtnClose';
import BtnAddCart from '../buttons/BtnAddCart';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    categorie?: string;
    attributes?: string;
    price?: string;
    price_definition?: string;
    img?: string;
    onAddBasket?: () => void;
}

export default function MyModal({ isOpen, onClose, title, description, categorie, attributes, price, img, onAddBasket }: ModalProps) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl max-h-auto transform 
                            overflow-hidden rounded-2xl bg-white p-6 text-right 
                            align-middle shadow-xl transition-all">

                                <div className='flex flex-row items-center justify-between'>
                                    <Dialog.Title
                                        as="h4"
                                        className="text-lg font-bold leading-6 text-gray-800"
                                    >
                                        {title}
                                    </Dialog.Title>

                                    <div className=" flex gap-3 justify-end">
                                        <BtnClose onclick={onClose} />
                                    </div>
                                </div>


                                <div className='flex flex-col md:flex-row items-center justify-center space-x-4 mt-4'>
                                    <div className="image-product">
                                        <img
                                            src={img}
                                            alt={title}
                                            className='max-w-sm w-full h-auto'
                                        />
                                    </div>
                                    <div className="mt-4 md:mt-0 text-sm   space-y-3">
                                        <div >
                                            <span className=' text-gray-800 font-bold'>توضیحات:</span>
                                            <span className=' text-gray-700 mx-1 text-justify font-meduim'>{description}</span>
                                        </div>
                                        <div >
                                            <span className=' text-gray-800 font-bold'>دسته بندی:</span>
                                            <span className=' text-gray-700 mx-1 font-meduim'>{categorie}</span>
                                        </div>
                                        <div >
                                            <span className=' text-gray-800 font-bold'>ویژگی های اصلی:</span>
                                            <span className=' text-gray-700 mx-1 font-meduim'>{attributes}</span>
                                        </div>
                                        <div>
                                            <span className=' text-gray-800 font-bold'>قیمت:</span>
                                            <span className=' text-gray-700 mx-1 font-semibold'>{price}</span>
                                        </div>


                                        {/* buttons */}
                                        <BtnAddCart
                                            onclick={onAddBasket}
                                            name='افزودن به سبد خرید' />
                                    </div>
                                </div>


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}