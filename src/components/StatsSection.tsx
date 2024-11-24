import { 
  UserGroupIcon, 
  BuildingOfficeIcon,
  UsersIcon,
  HomeModernIcon
} from '@heroicons/react/24/outline'

const stats = [
  {
    value: '62k+',
    label: 'Total lives impacted',
    icon: UsersIcon,
  },
  {
    value: '8k+',
    label: 'Serviceable Pin codes',
    icon: UserGroupIcon,
  },
  {
    value: '500k+',
    label: 'Organizations trust us',
    icon: BuildingOfficeIcon,
  },
  {
    value: '7.5k+',
    label: 'Network hospitals & clinics',
    icon: HomeModernIcon,
  }
]

export default function StatsSection() {
  return (
    <section className="py-10 bg-gradient-to-r from-[#0066CC] to-[#0052a3]">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-white/10 backdrop-blur-sm">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs font-medium text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}