import { useState } from 'react'
import Layout from './components/Layout'
import Banner from './components/Banner'
import ItemListContainer from './components/ItemListContainer'
import Formulario from './components/Formulario'

function App() {
  // acá guardo los productos que se cargan con el formulario
  const [productosNuevos, setProductosNuevos] = useState([])

  const agregarProducto = (producto) => {
    setProductosNuevos([...productosNuevos, producto])
  }

  return (
    <Layout>
      <Banner />
      <ItemListContainer titulo="Nuestros productos" productosNuevos={productosNuevos} />
      <Formulario onAgregar={agregarProducto} />
    </Layout>
  )
}

export default App
