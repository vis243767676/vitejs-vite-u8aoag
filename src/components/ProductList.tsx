import { useProduct } from '../context/ProductContext'
import ProductFilters from './ProductFilters'
import ActivityCard from './ActivityCard'
import CartOverlay from './CartOverlay'
import { products } from '../data/products'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function ProductList() {
  const { selectedModes, selectedCategories } = useProduct()
  const location = useLocation()
  const filtersRef = useRef<HTMLDivElement>(null)

  const filteredProducts = products.filter(product => {
    const modeMatch = selectedModes.includes(product.mode)
    const categoryMatch = selectedCategories.includes(product.category as any)
    return modeMatch && categoryMatch
  })

  // Scroll to filters section when coming from homepage
  useEffect(() => {
    if (location.state?.fromHomepage && filtersRef.current) {
      filtersRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.state])

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-6">
          Wellness Activities
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filters */}
          <div ref={filtersRef} className="lg:hidden mb-6">
            <ProductFilters />
          </div>
          
          {/* Desktop Filters */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <ProductFilters />
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              {filteredProducts.map((product, index) => (
                <ActivityCard 
                  key={index} 
                  item={product} 
                  index={index} 
                  section="activity"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <CartOverlay />
    </div>
  )
}