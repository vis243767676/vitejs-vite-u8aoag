import { StarIcon } from '@heroicons/react/24/solid'

const testimonials = [
  {
    name: 'Divvya Kakkar',
    role: 'Product manager',
    company: 'BAJAJ FINSERV HEALTH',
    content: 'Bajaj Healthcare is my go-to provider for all my healthcare needs. Their extensive product portfolio, combined with their great customer service, makes them a preferred choice for all my health choices.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    name: 'Aditya Sharma',
    role: 'Product manager',
    company: 'BAJAJ FINSERV HEALTH',
    content: 'Bajaj Healthcare is my go-to provider for all my healthcare needs. Their extensive product portfolio, combined with their great customer service, makes them a preferred choice for all my health choices.',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&q=80',
  },
  {
    name: 'Sathyasiddha Pattanaik',
    role: 'Product manager',
    company: 'BAJAJ FINSERV HEALTH',
    content: 'Bajaj Healthcare is my go-to provider for all my healthcare needs. Their extensive product portfolio, combined with their great customer service, makes them a preferred choice for all my health choices.',
    image: 'https://images.unsplash.com/photo-1618151313441-bc79b11e5090?w=400&q=80',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 mb-6 sm:mb-8">
          Here it from our customers
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm"
            >
              <div className="flex flex-col items-center text-center mb-3 sm:mb-4">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover mb-3 sm:mb-4"
                />
                <h3 className="text-sm sm:text-base font-semibold text-gray-900">{testimonial.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                <p className="text-xs sm:text-sm text-gray-500">{testimonial.company}</p>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 text-center line-clamp-4">
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}