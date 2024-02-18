import React, { useState, useEffect } from 'react';
import { Barra } from '../componentes/Barra';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Table, Modal } from "react-bootstrap";

export const RegistrarProducto = () => {
  const [showModal, setShowModal] = useState(false);
  const [producto, setProducto] = useState({
    idProducto: '',
    nombre: '',
    marca: '',
    existencia: '',
    precioAdq: '',
    precioVenta: '',
    presentacion: '',
    clasificacion: ''
  });
  const [productos, setProductos] = useState([]);
  const [idBuscar, setIdBuscar] = useState('');

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    const respuesta = await axios.get("http://localhost:8080/regProd");
    setProductos(respuesta.data);
  }

  const agregarProducto = () => {
    if (producto.idProducto.trim() === '' || producto.nombre.trim() === '' || producto.clasificacion.trim() === '' ||
      producto.existencia.toString() === '' || producto.precioAdq.toString() === '' || producto.precioVenta.toString() === '') {
      alert("Campos requeridos");
      return;
    }
    if (parseInt(producto.existencia) <= 0 || parseFloat(producto.precioAdq) <= 0 || parseFloat(producto.precioVenta) <= 0) {
      alert("Números negativos inválidos");
      return;
    } else if (parseFloat(producto.precioAdq) >= parseFloat(producto.precioVenta)) {
      alert("El precio de adquisición debe ser menor al de venta");
      return;
    }

    axios.post('http://localhost:8080/regProd', producto)
      .then((response) => {
        alert(response.data);
        obtenerProductos();
      })
      .catch((error) => {
        alert('Error al agregar')
        console.log(error);
      });
  };

  const eliminarProducto = (idProducto) => {
    axios.delete('http://localhost:8080/regProd/' + idProducto)
      .then((response) => {
        alert('Producto eliminado');
        obtenerProductos();
      })
      .catch((error) => {
        alert('Error al eliminar')
        console.log(error);
      });
  };

  const modificarProducto = (idProducto) => {
    if (producto.existencia.toString() === '' || producto.precioAdq.toString() === '' || producto.precioVenta.toString() === '') {
      alert("Debe modificar al menos un dato");
      return;
    }
    if (parseFloat(producto.existencia) <= 0 || parseFloat(producto.precioAdq) <= 0 || parseFloat(producto.precioVenta) <= 0) {
      alert("Números negativos inválidos");
      return;
    } else if (parseFloat(producto.precioAdq) >= parseFloat(producto.precioVenta)) {
      alert("El precio de adquisición debe ser menor al de venta");
      return;
    }

    axios.put('http://localhost:8080/regProd/' + idProducto, producto)
      .then((response) => {
        alert('Producto modificado');
        obtenerProductos();
      })
      .catch((error) => {
        alert('Error al modificar')
        console.log(error);
      });
  }

  const consultarProducto = (idBuscar) => {
    const resultado = productos.filter((producto) => {
      if (producto.idProducto.toString().toLowerCase().includes(idBuscar.toString().toLowerCase()) ||
        producto.nombre.toString().toLowerCase().includes(idBuscar.toString().toLowerCase())) {
        return producto;
      }
    });
    setProductos(resultado);
  };

  const handleChange = (event) => {
    setIdBuscar(event.target.value);
  };

  const handleInputChange = (event) => {
    setProducto({
      ...producto,
      [event.target.name]: event.target.value
    });
  };

  const openModal = (producto = null) => {
    if (producto) {
      setProducto({
        idProducto: producto.idProducto,
        marca: producto.marca,
        existencia: producto.existencia,
        precioAdq: producto.precioAdq,
        precioVenta: producto.precioVenta,
        presentacion: producto.presentacion,
        clasificacion: producto.clasificacion
      });
    } else {
      setProducto({
        idProducto: '',
        nombre: '',
        marca: '',
        existencia: '',
        precioAdq: '',
        precioVenta: '',
        presentacion: '',
        clasificacion: ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='fondo'>
      <Barra />
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Registrar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formID">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="idProducto"
                placeholder="ID"
                value={producto.idProducto}
                onChange={handleInputChange} />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={producto.nombre}
                onChange={handleInputChange} />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formMarca">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                name="marca"
                placeholder="Opcional"
                value={producto.marca}
                onChange={handleInputChange} />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formExistencia">
              <Form.Label>Existencia</Form.Label>
              <Form.Control
                type="number"
                name="existencia"
                value={producto.existencia}
                onChange={handleInputChange} />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formPrecioAdq">
              <Form.Label>Precio de adquisición</Form.Label>
              <Form.Control
                type="number"
                name="precioAdq"
                value={producto.precioAdq}
                onChange={handleInputChange} />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formPrecioVenta">
              <Form.Label>Precio de venta</Form.Label>
              <Form.Control
                type="number"
                name="precioVenta"
                value={producto.precioVenta}
                onChange={handleInputChange} />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formPresentacion">
              <Form.Label>Presentación</Form.Label>
              <Form.Control
                type="text"
                name="presentacion"
                placeholder="Opcional"
                value={producto.presentacion}
                onChange={handleInputChange} />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formClasificacion">
              <Form.Label>Clasificación</Form.Label>
              <Form.Control
                type="text"
                name="clasificacion"
                value={producto.clasificacion}
                onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" onClick={() => producto.nombre ? agregarProducto()
            : modificarProducto(producto.idProducto)}>Continuar</Button>
        </Modal.Footer>
      </Modal>

      <Container className="d-flex justify-content-center" style={{ minHeight: '100vh' }}>
        <Row>
          <Col>
            <Form>
              <Container className="d-flex justify-content-left">
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Buscar"
                      value={idBuscar}
                      onChange={handleChange} />
                  </Col>
                  <Col>
                    <Button variant="success" onClick={() => consultarProducto(idBuscar)}>Buscar</Button>
                  </Col>
                </Row>
              </Container>
            </Form>
            <div className="tabla">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Existencia</th>
                    <th>Precio de adquisición</th>
                    <th>Precio de venta</th>
                    <th>Presentación</th>
                    <th>Clasificación</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.idProducto}>
                      <td>{producto.idProducto}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.marca}</td>
                      <td>{producto.existencia}</td>
                      <td>${producto.precioAdq}</td>
                      <td>${producto.precioVenta}</td>
                      <td>{producto.presentacion}</td>
                      <td>{producto.clasificacion}</td>
                      <td><Button variant="danger" onClick={() => eliminarProducto(producto.idProducto)}>Eliminar</Button>
                        <Button variant="info" onClick={() => openModal(producto)}>Modificar</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <Button variant="success" onClick={() => openModal()}>Agregar producto</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}