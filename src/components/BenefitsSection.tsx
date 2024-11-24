import { ArrowRightIcon } from '@heroicons/react/24/outline'

const benefits = [
  {
    title: 'Annual Wellness calendar',
    description: 'A year-long activity schedule that will help create a culture of wellness in your organization.',
  },
  {
    title: 'Employee Engagement',
    description: 'Interesting fitness and health related activities to boost employee participation in wellness events.',
  },
  {
    title: 'Enhanced Productivity',
    description: 'Reduced employee absenteeism and increased productivity.',
  },
  {
    title: 'Healthier workforce',
    description: 'Improvement in the overall health profile of the organization, better fitness levels of employees.',
  },
]

interface BenefitsSectionProps {
  onContactClick: () => void
}

export default function BenefitsSection({ onContactClick }: BenefitsSectionProps) {
  return (
    <section className="py-8 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Discover the power of <span className="text-[#0066CC]">Wellsure@work</span>
            </h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Enhance employee & organizational health with our curated and customizable employee wellness program
            </p>
          </div>
          <button 
            onClick={onContactClick}
            className="w-full sm:w-auto px-6 py-2 border border-[#0066CC] text-[#0066CC] rounded hover:bg-blue-50 transition-colors"
          >
            Contact us
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white p-4 sm:p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-50">
                  <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#0066CC] transform rotate-[315deg]" />
                </div>
              </div>
              <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}