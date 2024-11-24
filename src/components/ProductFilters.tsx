import { useProduct } from '../context/ProductContext'

type Mode = 'online' | 'offline'
type Category = 'wellness' | 'mental' | 'physical' | 'team'

export default function ProductFilters() {
  const { 
    selectedModes, 
    setSelectedModes, 
    selectedCategories, 
    setSelectedCategories 
  } = useProduct()

  const handleModeChange = (mode: Mode) => {
    if (selectedModes.includes(mode)) {
      if (selectedModes.length > 1) {
        setSelectedModes(selectedModes.filter(m => m !== mode))
      }
    } else {
      setSelectedModes([...selectedModes, mode])
    }
  }

  const handleCategoryChange = (category: Category) => {
    if (selectedCategories.includes(category)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter(c => c !== category))
      }
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-lg mb-4">Filters</h3>
      
      <div className="mb-6">
        <h4 className="font-medium mb-3">Choose mode</h4>
        <div className="flex flex-wrap gap-3">
          {(['online', 'offline'] as Mode[]).map((mode) => (
            <label key={mode} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={selectedModes.includes(mode)}
                onChange={() => handleModeChange(mode)}
                className="h-4 w-4 rounded text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 capitalize">{mode}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Choose category</h4>
        <div className="flex flex-wrap gap-3">
          {(['wellness', 'mental', 'physical', 'team'] as Category[]).map((category) => (
            <label key={category} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 rounded text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}