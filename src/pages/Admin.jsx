import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Alert, Button, Container, Spinner, Table } from 'react-bootstrap'
import { FaEdit, FaPlus, FaTrash, FaDatabase } from 'react-icons/fa'
import useProductos from '../hooks/useProductos'
import ProductoForm from '../components/ProductoForm'
import ModalConfirmar from '../components/ModalConfirmar'
import { borrarProducto, crearProducto, editarProducto, sembrarProductos } from '../services/productos'
import { useAuth } from '../context/AuthContext'

function Admin() {
  const { user } = useAuth()
  const { productos, cargando, error, recargar } = useProductos()
  const [editando, setEditando] = useState(null) // null = form cerrado, {} = nuevo
  const [aBorrar, setABorrar] = useState(null)
  const [guardando, setGuardando] = useState(false)
  const [aviso, setAviso] = useState(null)

  const mostrarAviso = (tipo, texto) => setAviso({ tipo, texto })

  const guardar = async (datos) => {
    setGuardando(true)
    try {
      if (editando.id) await editarProducto(editando.id, datos)
      else await crearProducto(datos)
      mostrarAviso('success', editando.id ? 'Producto actualizado.' : 'Producto creado.')
      setEditando(null)
      recargar()
    } catch (e) {
      console.error(e)
      mostrarAviso('danger', 'No se pudo guardar. Revisá tu conexión y las reglas de Firebase.')
    } finally {
      setGuardando(false)
    }
  }

  const confirmarBorrado = async () => {
    try {
      await borrarProducto(aBorrar.id)
      mostrarAviso('success', 'Producto eliminado.')
      recargar()
    } catch (e) {
      console.error(e)
      mostrarAviso('danger', 'No se pudo eliminar el producto.')
    } finally {
      setABorrar(null)
    }
  }

  const cargarIniciales = async () => {
    try {
      await sembrarProductos()
      mostrarAviso('success', 'Productos iniciales cargados.')
      recargar()
    } catch (e) {
      console.error(e)
      mostrarAviso('danger', 'No se pudieron cargar los productos iniciales.')
    }
  }

  return (
    <Container className="py-5">
      <Helmet>
        <title>Panel de gestión | Frostec Refrigeración</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
        <div>
          <h2 className="mb-0">Panel de gestión</h2>
          <small className="text-muted">Sesión: {user.email}</small>
        </div>
        <Button onClick={() => setEditando({})} disabled={editando !== null}>
          <FaPlus /> Nuevo producto
        </Button>
      </div>

      {aviso && <Alert variant={aviso.tipo} dismissible onClose={() => setAviso(null)}>{aviso.texto}</Alert>}

      {editando !== null && (
        <ProductoForm
          inicial={editando}
          guardando={guardando}
          onGuardar={guardar}
          onCancelar={() => setEditando(null)}
        />
      )}

      {cargando && <div className="text-center my-4"><Spinner animation="border" role="status" /></div>}
      {error && <Alert variant="danger">{error}</Alert>}

      {!cargando && !error && productos.length === 0 && (
        <Alert variant="warning">
          No hay productos en la base de datos.{' '}
          <Button size="sm" variant="warning" onClick={cargarIniciales}><FaDatabase /> Cargar productos iniciales</Button>
        </Alert>
      )}

      {productos.length > 0 && (
        <Table responsive bordered hover className="bg-white align-middle">
          <thead>
            <tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>${Number(p.precio).toLocaleString('es-AR')}</td>
                <td>{p.stock}</td>
                <td className="text-nowrap">
                  <Button size="sm" variant="outline-primary" className="me-2" aria-label="Editar" onClick={() => setEditando(p)}>
                    <FaEdit />
                  </Button>
                  <Button size="sm" variant="outline-danger" aria-label="Eliminar" onClick={() => setABorrar(p)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <ModalConfirmar
        mostrar={aBorrar !== null}
        mensaje={aBorrar ? `¿Seguro que querés eliminar "${aBorrar.nombre}"? No se puede deshacer.` : ''}
        onConfirmar={confirmarBorrado}
        onCancelar={() => setABorrar(null)}
      />
    </Container>
  )
}

export default Admin
