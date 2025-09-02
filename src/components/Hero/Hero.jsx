import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRecycle, faTruck, faShield } from '@fortawesome/free-solid-svg-icons'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero_container">
        <h2 className="hero_title">
          Viva Sustentável
        </h2>
        <p className="hero_subtitle">
          Descubra produtos ecológicos que fazem a diferença para você e para o planeta. 
          Cada compra é um passo em direção a um futuro mais verde.
        </p>
        <div className="hero_features">
          <div className="hero_feature">
            <FontAwesomeIcon icon={faRecycle} className="hero_feature-icon" />
            <span>100% Sustentável</span>
          </div>
          <div className="hero_feature">
            <FontAwesomeIcon icon={faTruck} className="hero_feature-icon" />
            <span>Frete Carbono Zero</span>
          </div>
          <div className="hero_feature">
            <FontAwesomeIcon icon={faShield} className="hero_feature-icon" />
            <span>Qualidade Garantida</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

