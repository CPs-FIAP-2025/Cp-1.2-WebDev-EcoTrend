import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faShoppingCart, 
  faTimes, 
  faPlus, 
  faMinus, 
  faCheckCircle, 
  faSpinner 
} from '@fortawesome/free-solid-svg-icons'
import './CartSidebar.css'

const CartSidebar = ({ 
  isOpen, 
  onClose, 
  cart, 
  cartTotal, 
  cartItemsCount, 
  updateQuantity, 
  removeFromCart, 
  handleCheckout, 
  isCheckingOut, 
  checkoutMessage 
}) => {
  return (
    <div className={`cart-sidebar-overlay ${!isOpen ? 'cart-sidebar-overlay--hidden' : ''}`}>
      <div 
        className="cart-sidebar_backdrop"
        onClick={onClose}
      />
      <div className={`cart-sidebar ${isOpen ? 'cart-sidebar--open' : ''}`}>
        <div className="cart-sidebar_header">
          <h3 className="cart-sidebar_title">
            <FontAwesomeIcon icon={faShoppingCart} className="cart-sidebar_title-icon" />
            Carrinho ({cartItemsCount})
          </h3>
          <button
            className="cart-sidebar_close-button"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} className="cart-sidebar_close-icon" />
          </button>
        </div>

        <div className="cart-sidebar_items">
          {cart.length === 0 ? (
            <div className="cart-sidebar_empty">
              <FontAwesomeIcon icon={faShoppingCart} className="cart-sidebar_empty-icon" />
              <p className="cart-sidebar_empty-text">Seu carrinho está vazio</p>
            </div>
          ) : (
            <div className="cart-sidebar_items-list">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item_image"
                  />
                  <div className="cart-item_details">
                    <h4 className="cart-item_name">{item.name}</h4>
                    <p className="cart-item_price">
                      R$ {item.price.toFixed(2)}
                    </p>
                    <div className="cart-item_quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="cart-item_quantity-button"
                      >
                        <FontAwesomeIcon icon={faMinus} className="cart-item_quantity-icon" />
                      </button>
                      <span className="cart-item_quantity">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="cart-item_quantity-button"
                      >
                        <FontAwesomeIcon icon={faPlus} className="cart-item_quantity-icon" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="cart-item_remove-button"
                      >
                        <FontAwesomeIcon icon={faTimes} className="cart-item_remove-icon" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-sidebar_footer">
            <div className="cart-sidebar_total">
              <span className="cart-sidebar_total-label">Total:</span>
              <span className="cart-sidebar_total-value">R$ {cartTotal.toFixed(2)}</span>
            </div>
            
            {checkoutMessage && (
              <div className="cart-sidebar_checkout-message">
                {checkoutMessage}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="cart-sidebar_checkout-button"
            >
              {isCheckingOut ? (
                <>
                  <FontAwesomeIcon 
                    icon={faSpinner} 
                    className="cart-sidebar_checkout-icon cart-sidebar_checkout-icon--loading" 
                  />
                  Processando...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCheckCircle} className="cart-sidebar_checkout-icon" />
                  Finalizar Compra
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartSidebar

