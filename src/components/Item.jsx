import { useState } from 'react'
import { Badge, Button } from 'react-bootstrap'
import { FaCartPlus, FaMinus, FaPlus } from 'react-icons/fa'
import styled from 'styled-components'
import { useCarrito } from '../context/CarritoContext'

const Tarjeta = styled.article`
  background: #fff;
  border-radius: 6px;
  border-top: 5px solid #1a6fa8;
  box-shadow: 0 2px 6px rgba(11, 37, 69, 0.12);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    padding: 10px;
  }
`

const Cuerpo = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`

const Precio = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #1a6fa8;
  margin: 0;
`

const Contador = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

function Item({ producto }) {
  const { agregar } = useCarrito()
  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState('')

  const sinStock = producto.stock <= 0

  const handleAgregar = () => {
    agregar(producto, cantidad)
    setMensaje('Agregaste ' + cantidad + ' al carrito')
    setCantidad(1)
    setTimeout(() => setMensaje(''), 2000)
  }

  return (
    <Tarjeta>
      <img src={producto.imagen || '/img/sin-foto.svg'} alt={producto.nombre} />
      <Cuerpo>
        <div>
          <Badge bg="info" text="dark">{producto.categoria}</Badge>
        </div>
        <h3 className="h6 mb-0">{producto.nombre}</h3>
        <Precio>${Number(producto.precio).toLocaleString('es-AR')}</Precio>

        {sinStock ? (
          <Badge bg="danger" className="align-self-start">Sin stock</Badge>
        ) : (
          <small className={producto.stock <= 3 ? 'text-danger' : 'text-muted'}>
            {producto.stock <= 3 ? '¡Últimas unidades! ' : ''}Stock: {producto.stock}
          </small>
        )}

        <div className="mt-auto d-flex flex-wrap align-items-center gap-2 pt-2">
          <Contador>
            <Button size="sm" variant="outline-secondary" aria-label="Restar"
              disabled={sinStock || cantidad <= 1} onClick={() => setCantidad(cantidad - 1)}>
              <FaMinus />
            </Button>
            <span>{cantidad}</span>
            <Button size="sm" variant="outline-secondary" aria-label="Sumar"
              disabled={sinStock || cantidad >= producto.stock} onClick={() => setCantidad(cantidad + 1)}>
              <FaPlus />
            </Button>
          </Contador>
          <Button variant="dark" size="sm" disabled={sinStock} onClick={handleAgregar}>
            <FaCartPlus /> Agregar
          </Button>
        </div>
        {mensaje && <small className="text-success">{mensaje}</small>}
      </Cuerpo>
    </Tarjeta>
  )
}

export default Item
