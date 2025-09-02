import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faLeaf, faSearch } from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/img/logo.png'
import './Header.css'

const Header = ({ searchTerm, setSearchTerm, cartItemsCount, onCartOpen }) => {
  return (
    <header className="header">
      <div className="header_container">
        <div className="header_content">
          <div className="header_logo">
            <img src={logo} />
          </div>

          <div className="header_search">
            <FontAwesomeIcon icon={faSearch} className="header_search-icon" />
            <input
              type="text"
              placeholder="Buscar produtos sustentáveis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="header_search-input"
            />
          </div>

          <button
            onClick={onCartOpen}
            className="header_cart"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="header_cart-icon" />
            <span className="header_cart-text">Carrinho</span>
            {cartItemsCount > 0 && (
              <span className="header_cart-count">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="header_mobile-search">
          <div className="header_search">
            <FontAwesomeIcon icon={faSearch} className="header_search-icon" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="header_search-input"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

