import { useParams, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { useProduct } from '../context/ProductContext'
import CartOverlay from '../components/CartOverlay'
import ActivityCard from '../components/ActivityCard'

export default function ProductDetailPage() {
  const { section, id } = useParams()
  const navigate = useNavigate()
  const { cartItems, addToCart } = useProduct()
  
  const productId = parseInt(id || '0', 10)
  const product = products[productId]
  
  // Filter out current product and get 4 related products
  const relatedProducts = products
    .filter((_, index) => index !== productId)
    .slice(0, 4)

  const isAdded = cartItems.some(
    item => item.id === productId && item.section === section
  )

  const handleAddToCart = () => {
    if (product && section) {
      addToCart(productId, product.title, section as 'activity' | 'program')
    }
  }

  const handleRelatedProductClick = (index: number) => {
    // Navigate to the product detail page with the correct section and index
    navigate(`/product/${section}/${index}`, { replace: true })
    // Scroll to top of the page
    window.scrollTo(0, 0)
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="bg-gray-50">
      {/* Product Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative">
              <img 
                src={product.image}
                alt={product.title}
                className="w-full rounded-lg object-cover aspect-video"
              />
              <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                product.mode === 'online' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {product.mode}
              </span>
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              {/* Product Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-medium">Delhi</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-medium">30-100 participants</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Recommended group size:</span>
                  <span className="font-medium">30-100 participants</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Charges:</span>
                  <span className="font-medium">₹250 per person</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-medium">30-100 participants</span>
                </div>
              </div>

              <div className="mt-auto">
                <button
                  onClick={handleAddToCart}
                  className={`w-full sm:w-auto px-6 py-3 rounded-md font-medium text-white ${
                    isAdded
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-[#0066CC] hover:bg-blue-700'
                  }`}
                >
                  {isAdded ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">About the activity</h2>
          <p className="text-gray-600 mb-8">
            {product.description}
          </p>

          <h2 className="text-xl font-semibold mb-4">Benefits for the organization</h2>
          <p className="text-gray-600 mb-8">
            {product.description}
          </p>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">FAQs</h2>
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer list-none p-4 border rounded-lg">
                <span className="font-medium">What is SuperCard Bajaj Finserv Health Prime?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-gray-600 mt-4 px-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </details>
            
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer list-none p-4 border rounded-lg">
                <span className="font-medium">Where can I utilize my SuperCard benefits?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-gray-600 mt-4 px-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">You may also like</h2>
          <p className="text-gray-600 mt-1">Other activities you might be interested in</p>
        </div>
        
        {/* Mobile horizontal scroll */}
        <div className="sm:hidden -mx-4 px-4 overflow-x-auto">
          <div className="flex gap-4 min-w-max pb-4">
            {relatedProducts.map((product, index) => (
              <div 
                key={index} 
                className="w-[280px]"
                onClick={() => handleRelatedProductClick(index)}
              >
                <ActivityCard 
                  item={product}
                  index={index}
                  section={section as 'activity' | 'program'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product, index) => (
            <div 
              key={index}
              onClick={() => handleRelatedProductClick(index)}
            >
              <ActivityCard 
                item={product}
                index={index}
                section={section as 'activity' | 'program'}
              />
            </div>
          ))}
        </div>
      </div>

      <CartOverlay />
    </div>
  )
}