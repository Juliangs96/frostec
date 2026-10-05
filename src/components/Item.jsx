import { useState } from 'react'
import './Item.css'

function Item({ producto }) {
  const [cantidad, setCantidad] = useState(1)
  const [guardado, setGuardado] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const sumar = () => {
    if (cantidad < producto.stock) {
      setCantidad(cantidad + 1)
    }
  }

  const restar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1)
    }
  }

  const agregarAlCarrito = () => {
    setMensaje('Agregaste ' + cantidad + ' unidad(es)')
    setTimeout(() => setMensaje(''), 2000)
  }

  return (
    <article className="item">
      <img src={producto.imagen} alt={producto.nombre} />

      <div className="item-info">
        <span className="categoria">{producto.categoria}</span>
        <h3>{producto.nombre}</h3>
        <p className="precio">${producto.precio.toLocaleString('es-AR')}</p>
        <p className="stock">Stock: {producto.stock} unidades</p>

        <div className="item-botones">
          <div className="contador">
            <button onClick={restar}>-</button>
            <span>{cantidad}</span>
            <button onClick={sumar}>+</button>
          </div>
          <button className="agregar" onClick={agregarAlCarrito}>Agregar</button>
          <button className="guardar" onClick={() => setGuardado(!guardado)}>
            {guardado ? '♥ Guardado' : '♡ Guardar'}
          </button>
        </div>
        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>
    </article>
  )
}

export default Item
