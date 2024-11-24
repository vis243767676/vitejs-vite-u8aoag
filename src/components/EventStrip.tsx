import { StarIcon } from '@heroicons/react/24/solid'

export default function EventStrip() {
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm px-4 py-2.5 flex items-center justify-center gap-2 w-full">
      <StarIcon className="h-4 w-4 text-yellow-400" />
      <span className="text-sm font-medium text-gray-700">Event execution within 7 days</span>
      <StarIcon className="h-4 w-4 text-yellow-400" />
    </div>
  )
}