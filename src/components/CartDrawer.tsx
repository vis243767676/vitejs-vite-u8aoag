import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useProduct } from '../context/ProductContext'
import LeadFormDrawer from './LeadFormDrawer'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, updateQuantity, getTotalItems } = useProduct()
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false)
  const totalItems = getTotalItems()

  const handleConfirmItems = () => {
    setIsLeadFormOpen(true)
  }

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Your Cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={onClose}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {cartItems.map((item) => (
                                <li key={`${item.section}-${item.id}`} className="flex py-6">
                                  <div className="flex flex-1 flex-col">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{item.title}</h3>
                                      <div className="flex items-center space-x-2">
                                        <button 
                                          onClick={() => updateQuantity(item.id, item.section, -1)}
                                          className="rounded-full p-1 hover:bg-gray-100"
                                        >
                                          <MinusIcon className="h-4 w-4 text-gray-500" />
                                        </button>
                                        <span className="text-sm">{item.quantity}</span>
                                        <button 
                                          onClick={() => updateQuantity(item.id, item.section, 1)}
                                          className="rounded-full p-1 hover:bg-gray-100"
                                        >
                                          <PlusIcon className="h-4 w-4 text-gray-500" />
                                        </button>
                                      </div>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500 capitalize">{item.section}</p>
                                  </div>
                                </li>
                              ))}
                              {cartItems.length === 0 && (
                                <li className="py-6 text-center text-gray-500">
                                  Your cart is empty
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <button
                          onClick={handleConfirmItems}
                          className={`w-full rounded-md px-4 py-3 text-base font-medium text-white shadow-sm ${
                            totalItems > 0
                              ? 'bg-[#0066CC] hover:bg-blue-700'
                              : 'bg-gray-300 cursor-not-allowed'
                          }`}
                          disabled={totalItems === 0}
                        >
                          Confirm Items
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <LeadFormDrawer 
        isOpen={isLeadFormOpen}
        onClose={() => setIsLeadFormOpen(false)}
      />
    </>
  )
}