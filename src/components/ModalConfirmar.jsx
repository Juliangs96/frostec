import { Button, Modal } from 'react-bootstrap'

function ModalConfirmar({ mostrar, mensaje, onConfirmar, onCancelar }) {
  return (
    <Modal show={mostrar} onHide={onCancelar} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensaje}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancelar}>Cancelar</Button>
        <Button variant="danger" onClick={onConfirmar}>Eliminar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalConfirmar
