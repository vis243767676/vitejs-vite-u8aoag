import { useNavigate } from 'react-router-dom'
import { ShoppingCartIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useProduct } from '../context/ProductContext'
import { products } from '../data/products'

interface ActivityCardProps {
  item: typeof products[number];
  index: number;
  section: 'activity' | 'program';
}

export default function ActivityCard({ item, index, section }: ActivityCardProps) {
  const navigate = useNavigate()
  const { cartItems, addToCart } = useProduct()
  const isAdded = cartItems.some(cartItem => cartItem.id === index && cartItem.section === section)

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate(`/product/${section}/${index}`)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(index, item.title, section)
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-40 sm:h-48 object-cover"
        />
        <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
          item.mode === 'online' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {item.mode}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-xs sm:text-sm font-medium mb-1 line-clamp-2">{item.title}</h3>
        <p className="text-xs text-gray-600 mb-4 line-clamp-2">{item.description}</p>
        <button
          onClick={handleAddToCart}
          className={`w-full rounded-md px-4 py-2 text-xs sm:text-sm font-semibold shadow-sm transition-colors flex items-center justify-center gap-2 ${
            isAdded
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-[#0066CC] hover:bg-blue-700 text-white'
          }`}
        >
          {isAdded ? (
            <>
              Added to Cart
              <CheckIcon className="h-4 w-4" />
            </>
          ) : (
            <>
              Add to Cart
              <ShoppingCartIcon className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}