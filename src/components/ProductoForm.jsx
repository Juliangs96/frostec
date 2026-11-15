import { useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { FaSave, FaTimes } from 'react-icons/fa'

const vacio = { nombre: '', categoria: 'Heladeras', precio: '', stock: '', imagen: '' }

function validar(d) {
  const errores = {}
  if (!d.nombre.trim()) errores.nombre = 'El nombre es obligatorio'
  if (!(Number(d.precio) > 0)) errores.precio = 'El precio tiene que ser mayor a 0'
  if (d.stock === '' || !Number.isInteger(Number(d.stock)) || Number(d.stock) < 0) {
    errores.stock = 'El stock tiene que ser un número entero (0 o más)'
  }
  return errores
}

function ProductoForm({ inicial, onGuardar, onCancelar, guardando }) {
  const [datos, setDatos] = useState({ ...vacio, ...inicial })
  const [errores, setErrores] = useState({})

  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value })

  const enviar = (e) => {
    e.preventDefault()
    const nuevosErrores = validar(datos)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    onGuardar({
      nombre: datos.nombre.trim(),
      categoria: datos.categoria,
      precio: Number(datos.precio),
      stock: Number(datos.stock),
      imagen: datos.imagen.trim() || '/img/sin-foto.svg',
    })
  }

  return (
    <Form onSubmit={enviar} noValidate className="bg-white p-3 rounded border mb-4">
      <h3 className="h5 mb-3">{inicial?.nombre ? 'Editar producto' : 'Nuevo producto'}</h3>
      <Row className="g-3">
        <Col md={8}>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="nombre" value={datos.nombre} onChange={cambiar} isInvalid={!!errores.nombre} />
            <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="categoria">
            <Form.Label>Categoría</Form.Label>
            <Form.Select name="categoria" value={datos.categoria} onChange={cambiar}>
              <option>Heladeras</option>
              <option>Aires</option>
              <option>Lavarropas</option>
              <option>Herramientas</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col sm={6} md={4}>
          <Form.Group controlId="precio">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" name="precio" value={datos.precio} onChange={cambiar} isInvalid={!!errores.precio} />
            <Form.Control.Feedback type="invalid">{errores.precio}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6} md={4}>
          <Form.Group controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" name="stock" value={datos.stock} onChange={cambiar} isInvalid={!!errores.stock} />
            <Form.Control.Feedback type="invalid">{errores.stock}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="imagen">
            <Form.Label>Imagen (link, opcional)</Form.Label>
            <Form.Control name="imagen" value={datos.imagen} onChange={cambiar} placeholder="https://..." />
          </Form.Group>
        </Col>
      </Row>
      <div className="mt-3 d-flex gap-2">
        <Button type="submit" disabled={guardando}>
          {guardando ? <Spinner size="sm" animation="border" /> : <FaSave />} Guardar
        </Button>
        <Button variant="outline-secondary" onClick={onCancelar}><FaTimes /> Cancelar</Button>
      </div>
    </Form>
  )
}

export default ProductoForm
