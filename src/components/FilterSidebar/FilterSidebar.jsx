import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import './FilterSidebar.css'

const FilterSidebar = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  priceRange, 
  setPriceRange 
}) => {
  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar_content">
        <div className="filter-sidebar_header">
          <FontAwesomeIcon icon={faFilter} className="filter-sidebar_header-icon" />
          <h3 className="filter-sidebar_header-title">Filtros</h3>
        </div>

        <div className="filter-sidebar_section">
          <h4 className="filter-sidebar_section-title">Categorias</h4>
          <div className="filter-sidebar_categories">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`filter-sidebar_category-button ${
                  selectedCategory === category.id 
                    ? 'filter-sidebar_category-button--active' 
                    : ''
                }`}
              >
                <span className="filter-sidebar_category-emoji">{category.icon}</span>
                <span className="filter-sidebar_category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="filter-sidebar_section">
          <h4 className="filter-sidebar_section-title">Faixa de Preço</h4>
          <div className="filter-sidebar_price-display">
            <span>R$ {priceRange[0]}</span>
            <span>R$ {priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="300"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="filter-sidebar_price-slider"
          />
          <div className="filter-sidebar_price-inputs">
            <input
              type="number"
              placeholder="Mín"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
              className="filter-sidebar_price-input"
            />
            <input
              type="number"
              placeholder="Máx"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 300])}
              className="filter-sidebar_price-input"
            />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default FilterSidebar

