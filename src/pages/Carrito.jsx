import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Alert, Button, Container, Table } from 'react-bootstrap'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import { useCarrito } from '../context/CarritoContext'

function Carrito() {
  const { items, cambiarCantidad, eliminar, vaciar, total } = useCarrito()

  return (
    <Container className="py-5">
      <Helmet>
        <title>Carrito | Frostec Refrigeración</title>
        <meta name="description" content="Revisá los productos de tu carrito." />
      </Helmet>
      <h2 className="mb-4">Tu carrito</h2>

      {items.length === 0 ? (
        <Alert variant="info">
          Tu carrito está vacío. <Link to="/">Ver productos</Link>
        </Alert>
      ) : (
        <>
          <Table responsive bordered className="bg-white align-middle">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>${item.precio.toLocaleString('es-AR')}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Button size="sm" variant="outline-secondary" aria-label="Restar"
                        disabled={item.cantidad <= 1} onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}>
                        <FaMinus />
                      </Button>
                      {item.cantidad}
                      <Button size="sm" variant="outline-secondary" aria-label="Sumar"
                        disabled={item.cantidad >= item.stock} onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}>
                        <FaPlus />
                      </Button>
                    </div>
                  </td>
                  <td>${(item.precio * item.cantidad).toLocaleString('es-AR')}</td>
                  <td>
                    <Button size="sm" variant="outline-danger" aria-label="Eliminar del carrito" onClick={() => eliminar(item.id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
            <Button variant="outline-danger" onClick={vaciar}><FaTrash /> Vaciar carrito</Button>
            <h3 className="h4 mb-0">Total: ${total.toLocaleString('es-AR')}</h3>
          </div>
        </>
      )}
    </Container>
  )
}

export default Carrito
