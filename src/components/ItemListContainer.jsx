import { useState, useEffect } from 'react'
import Item from './Item'
import './ItemListContainer.css'

const categorias = ['Todos', 'Heladeras', 'Aires', 'Lavarropas', 'Herramientas']

function ItemListContainer({ titulo, productosNuevos }) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')

  // traigo los productos del json local
  useEffect(() => {
    fetch('/productos.json')
      .then((respuesta) => respuesta.json())
      .then((data) => {
        setProductos(data)
        setCargando(false)
      })
      .catch((error) => {
        console.log('Error al cargar productos:', error)
        setCargando(false)
      })
  }, [])

  const todos = [...productos, ...productosNuevos]

  const filtrados = todos.filter(
    (p) => categoriaActiva === 'Todos' || p.categoria === categoriaActiva
  )

  return (
    <section className="catalogo" id="productos">
      <h2>{titulo}</h2>

      <div className="filtros">
        {categorias.map((cat) => (
          <button
            key={cat}
            className={cat === categoriaActiva ? 'filtro activo' : 'filtro'}
            onClick={() => setCategoriaActiva(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {cargando && <p>Cargando productos...</p>}

      <div className="lista">
        {filtrados.map((producto) => (
          <Item key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  )
}

export default ItemListContainer
