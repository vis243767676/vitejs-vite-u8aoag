import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useProduct } from '../context/ProductContext'
import { submitLead } from '../services/leads'
import OrderConfirmationDrawer from './OrderConfirmationDrawer'
import ThankYouDrawer from './ThankYouDrawer'

interface LeadFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isContactForm?: boolean;
}

interface FormErrors {
  name?: string;
  companyName?: string;
  email?: string;
  phone?: string;
}

export default function LeadFormDrawer({ isOpen, onClose, isContactForm = false }: LeadFormDrawerProps) {
  const { cartItems } = useProduct()
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [isThankYouOpen, setIsThankYouOpen] = useState(false)
  const [submittedFormData, setSubmittedFormData] = useState(formData)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Company name validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await submitLead({
        ...formData,
        cartItems: isContactForm ? undefined : cartItems
      })
      
      // Store the submitted form data before resetting
      setSubmittedFormData({ ...formData })

      // Reset form
      setFormData({
        name: '',
        companyName: '',
        email: '',
        phone: ''
      })

      onClose()
      
      if (isContactForm) {
        setIsThankYouOpen(true)
      } else {
        setIsConfirmationOpen(true)
      }
    } catch (err) {
      setSubmitError('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value

    // Special handling for phone number
    if (field === 'phone') {
      // Remove any non-digit characters
      value = value.replace(/\D/g, '')
      // Limit to 10 digits
      value = value.slice(0, 10)
    }

    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
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
                      <div className="flex-1 overflow-y-auto">
                        {/* Close Button */}
                        <div className="absolute top-4 right-4 z-50">
                          <button
                            type="button"
                            className="rounded-md bg-white p-2 text-gray-400 hover:text-gray-500 shadow-md"
                            onClick={onClose}
                          >
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>

                        {/* Banner */}
                        <div className="relative h-48 bg-blue-50 mt-12">
                          <div className="absolute inset-0 flex">
                            <div className="w-3/5 p-6">
                              <h2 className="text-xl font-semibold text-gray-900">Please fill below details</h2>
                              <p className="mt-2 text-sm text-gray-600">
                                Please write below details to schedule a demo with our representative.
                              </p>
                            </div>
                            <div className="w-2/5">
                              <img 
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
                                alt="Customer Support"
                                className="h-48 w-full object-cover"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6">
                          {submitError && (
                            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">
                              {submitError}
                            </div>
                          )}
                          
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                              </label>
                              <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange('name')}
                                className={`mt-1 block w-full rounded-md border ${
                                  errors.name ? 'border-red-300' : 'border-gray-300'
                                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                placeholder="John Doe"
                              />
                              {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                              )}
                            </div>

                            <div>
                              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                                Company Name
                              </label>
                              <input
                                type="text"
                                id="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange('companyName')}
                                className={`mt-1 block w-full rounded-md border ${
                                  errors.companyName ? 'border-red-300' : 'border-gray-300'
                                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                placeholder="Your Company Ltd"
                              />
                              {errors.companyName && (
                                <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                              )}
                            </div>

                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Contact Email
                              </label>
                              <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange('email')}
                                className={`mt-1 block w-full rounded-md border ${
                                  errors.email ? 'border-red-300' : 'border-gray-300'
                                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                placeholder="john@company.com"
                              />
                              {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                              )}
                            </div>

                            <div>
                              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone number
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                value={formData.phone}
                                onChange={handleInputChange('phone')}
                                className={`mt-1 block w-full rounded-md border ${
                                  errors.phone ? 'border-red-300' : 'border-gray-300'
                                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                placeholder="1234567890"
                                maxLength={10}
                                pattern="[0-9]{10}"
                              />
                              {errors.phone && (
                                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                              )}
                            </div>
                          </div>

                          <div className="mt-6">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className={`w-full rounded-md bg-[#0066CC] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                              }`}
                            >
                              {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <OrderConfirmationDrawer 
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        formData={submittedFormData}
      />

      <ThankYouDrawer 
        isOpen={isThankYouOpen}
        onClose={() => setIsThankYouOpen(false)}
      />
    </>
  )
}