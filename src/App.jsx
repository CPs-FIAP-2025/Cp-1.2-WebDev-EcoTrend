import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

// Importar componentes
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import FilterSidebar from './components/FilterSidebar/FilterSidebar'
import ProductCard from './components/ProductCard/ProductCard'
import CartSidebar from './components/CartSidebar/CartSidebar'
import Footer from './components/Footer/Footer'

import './App.css'

function App() {
  // Estados principais
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 300])
  const [searchTerm, setSearchTerm] = useState('')
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutMessage, setCheckoutMessage] = useState('')

  // Categorias disponíveis
  const categories = [
    { id: 'all', name: 'Todos os Produtos', icon: '🌱' },
    { id: 'roupas', name: 'Roupas Sustentáveis', icon: '👕' },
    { id: 'beleza', name: 'Beleza Natural', icon: '🧴' },
    { id: 'casa', name: 'Casa Sustentável', icon: '🏠' },
    { id: 'tecnologia', name: 'Tecnologia Verde', icon: '🔋' }
  ]

  // Carregar produtos do JSON
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        // Simular delay de carregamento
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const response = await fetch('/products.json')
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Carregar carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('ecotrend-cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Salvar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem('ecotrend-cart', JSON.stringify(cart))
  }, [cart])

  // Filtrar produtos
  useEffect(() => {
    let filtered = products

    // Filtro por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filtro por preço
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }, [products, selectedCategory, priceRange, searchTerm])

  // Adicionar ao carrinho
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  // Remover do carrinho
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  // Atualizar quantidade
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  // Calcular total do carrinho
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  // Checkout simulado
  const handleCheckout = async () => {
    if (cart.length === 0) return

    setIsCheckingOut(true)
    setCheckoutMessage('')

    try {
      // Simular validação e processamento
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simular sucesso/erro aleatório
      const success = Math.random() > 0.2 // 80% de sucesso
      
      if (success) {
        setCheckoutMessage('✅ Pedido realizado com sucesso! Obrigado por escolher produtos sustentáveis!')
        setCart([])
        setTimeout(() => {
          setIsCartOpen(false)
          setCheckoutMessage('')
        }, 3000)
      } else {
        setCheckoutMessage('❌ Erro no processamento. Tente novamente.')
      }
    } catch (error) {
      setCheckoutMessage('❌ Erro no processamento. Tente novamente.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  // Obter nome da categoria atual
  const getCurrentCategoryName = () => {
    if (selectedCategory === 'all') return 'Todos os Produtos'
    return categories.find(c => c.id === selectedCategory)?.name || 'Produtos'
  }

  return (
    <div className="app">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartItemsCount={cartItemsCount}
        onCartOpen={() => setIsCartOpen(true)}
      />
      <Hero />
      <div className="main-container">
        <div className="main-content">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
          <main className="products-section">
            {loading ? (
              <div className="loading-container">
                <div className="loading-content">
                  <FontAwesomeIcon icon={faSpinner} className="loading-spinner" />
                  <p className="loading-text">Carregando produtos sustentáveis...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="products-header">
                  <h2 className="products-title">{getCurrentCategoryName()}</h2>
                  <p className="products-count">
                    {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="products-grid">
                    {filteredProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="no-products">
                    <div className="no-products-icon">🌱</div>
                    <h3 className="no-products-title">Nenhum produto encontrado</h3>
                    <p className="no-products-description">
                      Tente ajustar os filtros ou buscar por outros termos.
                    </p>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        cartItemsCount={cartItemsCount}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        handleCheckout={handleCheckout}
        isCheckingOut={isCheckingOut}
        checkoutMessage={checkoutMessage}
      />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App

