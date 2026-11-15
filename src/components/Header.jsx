import { Link } from 'react-router-dom'
import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import { FaShoppingCart, FaUserCog, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'

const Aviso = styled.div`
  background: #0b2545;
  color: #9fd4ea;
  font-size: 12px;
  text-align: center;
  padding: 6px;
`

const Barra = styled(Navbar)`
  background: #fff;
  border-bottom: 3px solid #1a6fa8;
`

const Logo = styled(Navbar.Brand)`
  font-weight: bold;
  font-size: 26px;
  span {
    color: #1a6fa8;
  }
`

function Header() {
  const { user, logout } = useAuth()
  const { cantidadTotal } = useCarrito()

  return (
    <header>
      <Aviso>Servicio técnico urgente: WhatsApp 11 6428-3917 | Lunes a sábados de 8 a 19 hs</Aviso>
      <Barra expand="md">
        <Container>
          <Logo as={Link} to="/">Frost<span>ec</span></Logo>
          <Navbar.Toggle aria-controls="menu" />
          <Navbar.Collapse id="menu">
            <Nav className="ms-auto align-items-md-center gap-md-2">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/carrito">
                <FaShoppingCart /> Carrito{' '}
                {cantidadTotal > 0 && <Badge bg="primary">{cantidadTotal}</Badge>}
              </Nav.Link>
              {user ? (
                <>
                  <Nav.Link as={Link} to="/admin"><FaUserCog /> Administrar</Nav.Link>
                  <Nav.Link onClick={logout}><FaSignOutAlt /> Salir</Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login"><FaSignInAlt /> Ingresar</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Barra>
    </header>
  )
}

export default Header
