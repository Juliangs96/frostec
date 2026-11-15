import { useState } from 'react'
import { Alert, Button, Col, Container, Form, InputGroup, Pagination, Row, Spinner } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import Item from './Item'
import useProductos from '../hooks/useProductos'

const categorias = ['Todos', 'Heladeras', 'Aires', 'Lavarropas', 'Herramientas']
const POR_PAGINA = 6

function ItemListContainer({ titulo }) {
  const { productos, cargando, error, recargar } = useProductos()
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todos')
  const [pagina, setPagina] = useState(1)

  // filtro en tiempo real por nombre y categoría
  const filtrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (categoria === 'Todos' || p.categoria === categoria)
  )

  const totalPaginas = Math.ceil(filtrados.length / POR_PAGINA)
  const visibles = filtrados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA)

  const cambiarBusqueda = (e) => {
    setBusqueda(e.target.value)
    setPagina(1)
  }

  const cambiarCategoria = (cat) => {
    setCategoria(cat)
    setPagina(1)
  }

  return (
    <Container as="section" id="productos" className="py-5">
      <h2 className="mb-3">{titulo}</h2>

      <Row className="g-3 mb-4">
        <Col md={5}>
          <InputGroup>
            <InputGroup.Text><FaSearch /></InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Buscar producto..."
              aria-label="Buscar producto"
              value={busqueda}
              onChange={cambiarBusqueda}
            />
          </InputGroup>
        </Col>
        <Col md={7} className="d-flex flex-wrap gap-2">
          {categorias.map((cat) => (
            <Button key={cat} size="sm" variant={cat === categoria ? 'primary' : 'outline-primary'}
              onClick={() => cambiarCategoria(cat)}>
              {cat}
            </Button>
          ))}
        </Col>
      </Row>

      {cargando && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
          <p className="mt-2">Cargando productos...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger">
          {error} <Button size="sm" variant="outline-danger" onClick={recargar}>Reintentar</Button>
        </Alert>
      )}

      {!cargando && !error && filtrados.length === 0 && (
        <Alert variant="info">
          {productos.length === 0
            ? 'Todavía no hay productos cargados.'
            : 'No encontramos productos con esa búsqueda.'}
        </Alert>
      )}

      <Row className="g-4">
        {visibles.map((producto) => (
          <Col key={producto.id} xs={12} sm={6} lg={4}>
            <Item producto={producto} />
          </Col>
        ))}
      </Row>

      {totalPaginas > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev disabled={pagina === 1} onClick={() => setPagina(pagina - 1)} />
          {Array.from({ length: totalPaginas }, (_, i) => (
            <Pagination.Item key={i} active={i + 1 === pagina} onClick={() => setPagina(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next disabled={pagina === totalPaginas} onClick={() => setPagina(pagina + 1)} />
        </Pagination>
      )}
    </Container>
  )
}

export default ItemListContainer
