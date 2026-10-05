import './Header.css'

function Header() {
  return (
    <header>
      <div className="barra-superior">
        Servicio técnico urgente: WhatsApp 11 6428-3917 | Lunes a sábados de 8 a 19 hs
      </div>
      <div className="header">
        <h2 className="logo">Frost<span>ec</span></h2>
        <nav className="nav">
          <a href="#inicio">Inicio</a>
          <a href="#productos">Productos</a>
          <a href="#formulario">Cargar producto</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
