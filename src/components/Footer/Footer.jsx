import './Footer.css'
import logo from '../../assets/img/logo.png'

const Footer = () => {
  const footerLinks = {
    produtos: [
      'Roupas Sustentáveis',
      'Beleza Natural',
      'Casa Sustentável',
      'Tecnologia Verde'
    ],
    equipe: [
      'Leonardo Silva - 564929',
      'Guilherme de Araújo - 561848',
      'Samuel Monteiro - 564391',
      'Yan Barutti - 566412',
      'Lucas Cortonezi - 563271',
    ],
    suporte: [
      'Central de Ajuda',
      'Frete e Entrega',
      'Trocas e Devoluções',
      'Contato'
    ]
  }

  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="footer_content">
          <div className="footer_brand">
            <div className="footer_logo">
              <img src={logo} />
            </div>
            <p className="footer_description">
              Comprometidos com um futuro sustentável através de produtos ecológicos 
              e práticas responsáveis. Cada compra contribui para um planeta melhor.
            </p>
          </div>
          <div className="footer_section">
            <h4 className="footer_section-title">Produtos</h4>
            <ul className="footer_links">
              {footerLinks.produtos.map((link, index) => (
                <li key={index} className="footer_link-item">
                  <a href="#" className="footer_link">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer_section">
            <h4 className="footer_section-title">Equipe</h4>
            <ul className="footer_links">
              {footerLinks.equipe.map((link, index) => (
                <li key={index} className="footer_link-item">
                  <a href="#" className="footer_link">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer_section">
            <h4 className="footer_section-title">Suporte</h4>
            <ul className="footer_links">
              {footerLinks.suporte.map((link, index) => (
                <li key={index} className="footer_link-item">
                  <a href="#" className="footer_link">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
        <div className="footer_copyright">
          <p className="footer_copyright-text">EcoTrend &copy;2025 - Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

