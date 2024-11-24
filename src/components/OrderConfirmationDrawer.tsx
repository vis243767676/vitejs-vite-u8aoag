import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useProduct } from '../context/ProductContext'

interface OrderConfirmationDrawerProps {
  isOpen: boolean
  onClose: () => void
  formData: {
    name: string
    companyName: string
    email: string
    phone: string
  }
}

export default function OrderConfirmationDrawer({ isOpen, onClose, formData }: OrderConfirmationDrawerProps) {
  const { cartItems, clearCart } = useProduct()
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  const handleClose = () => {
    clearCart()
    onClose()
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white">
                    {/* Header */}
                    <div className="bg-[#0066CC] px-4 py-6 relative">
                      <div className="flex justify-center mb-4">
                        <CheckCircleIcon className="h-12 w-12 text-white" />
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-semibold text-white inline">
                          Order placed for {totalItems} {totalItems === 1 ? 'item' : 'items'} successfully!
                        </p>
                        <p className="text-blue-100 mt-1">
                          We'll contact you soon.
                        </p>
                      </div>
                      <button
                        type="button"
                        className="absolute top-4 right-4 rounded-md bg-white/10 p-2 text-white hover:bg-white/20"
                        onClick={handleClose}
                      >
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto">
                      {/* Details Section */}
                      <div className="px-4 py-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Details submitted</h3>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{formData.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Organization Name</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{formData.companyName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email ID</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{formData.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Mobile Number</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{formData.phone}</p>
                          </div>
                        </div>
                      </div>

                      {/* Order Details Section */}
                      <div className="px-4 pb-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Order details</h3>
                        <div className="space-y-3">
                          {cartItems.map((item) => (
                            <div 
                              key={`${item.section}-${item.id}`}
                              className="bg-gray-50 rounded-lg p-4 flex justify-between items-start"
                            >
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                                <p className="text-xs text-gray-500 capitalize mt-1">{item.section}</p>
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                {item.quantity} ppl
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}