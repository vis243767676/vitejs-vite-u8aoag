import { Link } from 'react-router-dom'
import { products } from '../data/products'

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold">
                <span className="text-orange-500">Raise</span> your workplace health quotient with
              </h1>
              <div className="mt-4">
                <img src="/wellsure-logo.png" alt="Wellsure @work" className="h-12" />
              </div>
              <p className="mt-4 text-gray-600">
                Enabling complete healthcare for your employees!
              </p>
              <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors">
                Schedule a Demo
              </button>
            </div>
            <div className="relative">
              <img 
                src="/hero-image.png" 
                alt="Workplace Health" 
                className="w-full"
              />
              <div className="absolute bottom-4 right-4 text-center">
                <p className="text-sm text-gray-600">Event execution within 7 days</p>
                <div className="flex gap-1 mt-2 justify-center">
                  {[0, 1, 2].map((i) => (
                    <div 
                      key={i} 
                      className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Wellness Activities</h2>
          <Link 
            to="/products" 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}