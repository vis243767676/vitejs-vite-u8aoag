import { createContext, useContext, useState, ReactNode } from 'react'

interface CartItem {
  id: number
  title: string
  section: 'activity' | 'program'
  quantity: number
}

type Mode = 'online' | 'offline'
type Category = 'wellness' | 'mental' | 'physical' | 'team'

interface ProductContextType {
  selectedModes: Mode[]
  setSelectedModes: (modes: Mode[]) => void
  selectedCategories: Category[]
  setSelectedCategories: (categories: Category[]) => void
  cartItems: CartItem[]
  addToCart: (id: number, title: string, section: 'activity' | 'program') => void
  removeFromCart: (id: number, section: 'activity' | 'program') => void
  updateQuantity: (id: number, section: 'activity' | 'program', delta: number) => void
  getTotalItems: () => number
  clearCart: () => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [selectedModes, setSelectedModes] = useState<Mode[]>(['online', 'offline'])
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(['wellness', 'mental', 'physical', 'team'])
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (id: number, title: string, section: 'activity' | 'program') => {
    const existingItem = cartItems.find(item => item.id === id && item.section === section)
    if (existingItem) {
      setCartItems(prev => prev.filter(item => !(item.id === id && item.section === section)))
    } else {
      setCartItems(prev => [...prev, { id, title, section, quantity: 1 }])
    }
  }

  const removeFromCart = (id: number, section: 'activity' | 'program') => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.section === section)))
  }

  const updateQuantity = (id: number, section: 'activity' | 'program', delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.section === section) {
        const newQuantity = Math.max(0, item.quantity + delta)
        return newQuantity === 0 ? null : { ...item, quantity: newQuantity }
      }
      return item
    }).filter(Boolean) as CartItem[])
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <ProductContext.Provider value={{
      selectedModes,
      setSelectedModes,
      selectedCategories,
      setSelectedCategories,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalItems,
      clearCart
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProduct() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider')
  }
  return context
}