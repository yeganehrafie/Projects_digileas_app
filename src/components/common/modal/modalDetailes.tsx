import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import BtnClose from '../buttons/BtnClose';

interface ModalField {
    label: string;
    value: string | number | React.ReactNode;
    type?: 'text' | 'image' | 'badge' | 'custom';
    className?: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    image?: string;
    fields?: ModalField[];
    actions?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    children?: React.ReactNode;
}

export default function MyModal({
    isOpen,
    onClose,
    title,
    description,
    image,
    fields = [],
    actions,
    size = 'md',
    children
}: ModalProps) {

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl'
    };

    const renderFieldValue = (field: ModalField) => {
        switch (field.type) {
            case 'image':
                return (
                    <img
                        src={field.value as string}
                        alt={field.label}
                        className="max-w-full h-auto rounded-lg"
                    />
                );
            case 'badge':
                return (
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${field.className || 'bg-blue-100 text-blue-800'}`}>
                        {field.value}
                    </span>
                );
            case 'custom':
                return field.value;
            default:
                return (
                    <span className={`text-gray-700 ${field.className || ''}`}>
                        {field.value}
                    </span>
                );
        }
    };

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
                            <Dialog.Panel className={`w-full ${sizeClasses[size]} transform 
                                overflow-hidden rounded-2xl bg-white p-6 text-right 
                                align-middle shadow-xl transition-all`}>

                                {/* Header */}
                                <div className='flex flex-row items-center justify-between mb-4'>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-bold leading-6 text-emerald-500"
                                    >
                                        {title}
                                    </Dialog.Title>
                                    <BtnClose onclick={onClose} />
                                </div>

                                {/* Description */}
                                {description && (
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600 text-justify">
                                            {description}
                                        </p>
                                    </div>
                                )}

                                {/* Content */}
                                <div className='flex flex-col md:flex-row gap-6'>
                                    {/* Image Section */}
                                    {image && (
                                        <div className="flex-shrink-0 md:w-1/3">
                                            <img
                                                src={image}
                                                alt={title}
                                                className='w-full h-auto rounded-lg object-cover'
                                            />
                                        </div>
                                    )}

                                    {/* Fields Section */}
                                    <div className={`flex-1 ${image ? 'md:w-2/3' : 'w-full'}`}>
                                        {children ? (
                                            children
                                        ) : (
                                            <div className="space-y-4">
                                                {fields.map((field, index) => (
                                                    <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-2">
                                                        <span className='text-gray-800 font-bold min-w-[120px] flex-shrink-0'>
                                                            {field.label}:
                                                        </span>
                                                        <div className="flex-1">
                                                            {renderFieldValue(field)}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                {actions && (
                                    <div className="mt-6 flex justify-end gap-3">
                                        {actions}
                                    </div>
                                )}

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}