import { useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import ActivityCard from '../components/ActivityCard'
import StatsSection from '../components/StatsSection'
import BenefitsSection from '../components/BenefitsSection'
import TestimonialsSection from '../components/TestimonialsSection'
import CartOverlay from '../components/CartOverlay'
import EventStrip from '../components/EventStrip'
import LeadFormDrawer from '../components/LeadFormDrawer'
import { useState } from 'react'

export default function HomePage() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false)
  const navigate = useNavigate()
  const featuredActivities = products.slice(0, 4)
  const featuredPrograms = products.slice(2, 6)

  const handleViewAll = () => {
    navigate('/products', { state: { fromHomepage: true } })
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#F8FBFF] overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="z-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                <span className="text-[#FF8A00]">Raise</span> your workplace health quotient with
              </h1>
              <div className="mb-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0066CC]">
                  Wellsure@work
                </h2>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Enabling complete healthcare for your employees!
              </p>
              <button 
                onClick={() => setIsLeadFormOpen(true)}
                className="w-full sm:w-auto bg-[#0066CC] text-white px-6 py-2.5 rounded font-medium hover:bg-blue-700 transition-colors"
              >
                Schedule a Demo
              </button>
            </div>
            
            <div className="relative">
              <EventStrip />
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img 
                      src={products[index].image}
                      alt={`Banner ${index + 1}`}
                      className="w-full h-32 sm:h-48 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Wellness Activities Section */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-gray-900">
              Wellness Activities
            </h2>
            <button 
              onClick={handleViewAll}
              className="text-[#0066CC] text-xs sm:text-sm font-semibold hover:text-blue-700"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {featuredActivities.map((activity, index) => (
              <ActivityCard 
                key={index} 
                item={activity} 
                index={index}
                section="activity"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Programs Section */}
      <section className="py-6 sm:py-8 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-gray-900">
              Wellness Programs
            </h2>
            <button 
              onClick={handleViewAll}
              className="text-[#0066CC] text-xs sm:text-sm font-semibold hover:text-blue-700"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {featuredPrograms.map((program, index) => (
              <ActivityCard 
                key={index} 
                item={program} 
                index={index + 2}
                section="program"
              />
            ))}
          </div>
        </div>
      </section>

      <BenefitsSection onContactClick={() => setIsLeadFormOpen(true)} />
      <TestimonialsSection />

      <CartOverlay />
      <LeadFormDrawer 
        isOpen={isLeadFormOpen}
        onClose={() => setIsLeadFormOpen(false)}
        isContactForm
      />
    </div>
  )
}