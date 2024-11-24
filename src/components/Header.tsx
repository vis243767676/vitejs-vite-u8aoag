import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center">
          <Link to="/" className="flex-shrink-0">
            <img 
              src="https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/7a/9f/c2/7a9fc245-9189-2e1e-6b04-0721a9be6186/AppIcon-0-0-1x_U007emarketing-0-0-0-5-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png" 
              alt="Bajaj Health" 
              className="h-8"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}