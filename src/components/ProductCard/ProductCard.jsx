import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faStar, faHeart } from '@fortawesome/free-solid-svg-icons'
import './ProductCard.css'

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card product-card--fade-in">
      <div className="product-card_image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-card_image"
        />
        <button className="product-card_favorite-button">
          <FontAwesomeIcon icon={faHeart} className="product-card_favorite-icon" />
        </button>
        <div className="product-card_sustainability-tag">
          {product.sustainability}
        </div>
      </div>
      
      <div className="product-card_content">
        <h3 className="product-card_title">{product.name}</h3>
        <p className="product-card_description">{product.description}</p>
        
        <div className="product-card_rating">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              className={`product-card_star ${
                i < 4 ? 'product-card_star--filled' : 'product-card_star--empty'
              }`}
            />
          ))}
          <span className="product-card_rating-text">(4.0)</span>
        </div>

        <div className="product-card_footer">
          <div className="product-card_price">
            R$ {product.price.toFixed(2)}
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="product-card_add-button"
          >
            <FontAwesomeIcon icon={faPlus} className="product-card_add-icon" />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

