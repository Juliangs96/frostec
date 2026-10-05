import { useState } from 'react'
import './Formulario.css'

function Formulario({ onAgregar }) {
  const [id, setId] = useState('')
  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState('Heladeras')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [imagen, setImagen] = useState('')
  const [error, setError] = useState('')

  const manejarImagen = (e) => {
    const archivo = e.target.files[0]
    if (archivo) {
      setImagen(URL.createObjectURL(archivo))
    }
  }

  const manejarSubmit = (e) => {
    e.preventDefault()

    if (id === '' || nombre === '' || precio === '' || stock === '') {
      setError('Tenés que completar todos los campos')
      return
    }

    onAgregar({
      id: Number(id),
      nombre: nombre,
      categoria: categoria,
      precio: Number(precio),
      stock: Number(stock),
      imagen: imagen || '/img/sin-foto.svg',
    })

    // limpio el formulario
    setId('')
    setNombre('')
    setCategoria('Heladeras')
    setPrecio('')
    setStock('')
    setImagen('')
    setError('')
    e.target.reset()
  }

  return (
    <section className="formulario" id="formulario">
      <h2>Cargar un producto nuevo</h2>
      <form onSubmit={manejarSubmit}>
        <label>
          Id
          <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
        </label>
        <label>
          Categoría
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option>Heladeras</option>
            <option>Aires</option>
            <option>Lavarropas</option>
            <option>Herramientas</option>
          </select>
        </label>
        <label className="ancho-total">
          Nombre del producto
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Cocina industrial 4 hornallas" />
        </label>
        <label>
          Precio
          <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Ej: 150000" />
        </label>
        <label>
          Stock
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Ej: 5" />
        </label>
        <label className="ancho-total">
          Imagen
          <input type="file" accept="image/*" onChange={manejarImagen} />
        </label>
        {error && <p className="error ancho-total">{error}</p>}
        <button type="submit" className="ancho-total">Guardar producto</button>
      </form>
    </section>
  )
}

export default Formulario
