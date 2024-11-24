import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext'
import ProductList from './components/ProductList'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import ProductDetailPage from './pages/ProductDetailPage'

export default function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:section/:id" element={<ProductDetailPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ProductProvider>
  )
}