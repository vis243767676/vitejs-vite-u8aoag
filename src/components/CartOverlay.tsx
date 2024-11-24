import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useProduct } from '../context/ProductContext'
import CartDrawer from './CartDrawer'
import { useState, useEffect } from 'react'

export default function CartOverlay() {
  const { getTotalItems } = useProduct()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const totalItems = getTotalItems()

  useEffect(() => {
    if (totalItems > 0) {
      setIsVisible(true)
    }
  }, [totalItems])

  const handleClose = () => {
    setIsDrawerOpen(false)
    if (totalItems === 0) {
      setIsVisible(false)
    }
  }

  if (!isVisible) return null

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShoppingCartIcon className="h-5 w-5 text-[#0066CC]" />
              <span className="font-medium text-gray-900">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="bg-[#0066CC] text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              View Cart
              <ShoppingCartIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <CartDrawer 
        isOpen={isDrawerOpen}
        onClose={handleClose}
      />
    </>
  )
}