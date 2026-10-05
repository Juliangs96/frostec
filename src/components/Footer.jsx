import './Footer.css'

// datos del equipo (cambiar por los reales)
const equipo = [
  { id: 1, nombre: 'Gustavo Ledesma', cargo: 'Técnico matriculado', email: 'gustavo@frostec.com.ar', color: '#1a6fa8' },
  { id: 2, nombre: 'Natalia Quiroga', cargo: 'Ventas y atención', email: 'natalia@frostec.com.ar', color: '#2a9d8f' },
  { id: 3, nombre: 'Emiliano Barrios', cargo: 'Instalaciones', email: 'emiliano@frostec.com.ar', color: '#e76f51' },
]

function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="footer-columnas">
        <div>
          <h3>Frostec Refrigeración</h3>
          <p>Venta, instalación y reparación de equipos de frío desde 2010.</p>
          <p>Av. Santa Rosa 2450, Caseros, Tres de Febrero, Buenos Aires</p>
          <p>Lunes a sábados de 8 a 19 hs</p>
          <p>contacto@frostec.com.ar</p>
        </div>

        <div>
          <h3>Nuestro equipo</h3>
          <div className="equipo">
            {equipo.map((persona) => (
              <div className="persona" key={persona.id}>
                <div className="iniciales" style={{ backgroundColor: persona.color }}>
                  {persona.nombre.charAt(0)}
                </div>
                <div>
                  <p className="persona-nombre">{persona.nombre}</p>
                  <p>{persona.cargo}</p>
                  <p className="persona-email">{persona.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="copy">© 2026 Frostec Refrigeración</p>
    </footer>
  )
}

export default Footer
