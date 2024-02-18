import React, { useState, useEffect } from 'react';
import { Barra } from '../componentes/Barra';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Table, Modal } from "react-bootstrap";

export const RegistrarVenta = () => {
  const [showModal, setShowModal] = useState(false);
  const [ventas, setVentas] = useState([]);
  const [venta, setVenta] = useState({
    idVenta: '',
    fecha: '',
    idUsuario: '',
    idProducto: '',
    nombre: '',
    cantVendida: '',
    total: '',
    ganancia: ''
  });
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerVentas();
  }, []);

  const obtenerVentas = async () => {
    const respuesta = await axios.get("http://localhost:8080/regVenta");
    setVentas(respuesta.data);
  }

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    const respuesta = await axios.get("http://localhost:8080/regProd");
    setProductos(respuesta.data);
  }

  const registrarVentas = () => {
    venta.idVenta = new Date();
    if(venta.fecha.toString() === '' || venta.cantVendida.toString() === '' || venta.idUsuario.toString() === '') {
      alert("Campos requeridos");
      return;
    }
    if(parseInt(venta.cantVendida) <= 0 || parseInt(venta.idUsuario) <= 0){
      alert("Números negativos inválidos");
      return;
    }

    axios.post('http://localhost:8080/regVenta', venta)
    .then((response) => {
      alert(response.data);
      obtenerVentas();
    })
    .catch((error) => {
      alert('Error al registrar')
      console.log(error);
    });
  };

  const handleInputChange = (event) => {
    setVenta({
      ...venta,
      [event.target.name]: event.target.value
    });
  };

  const openModal = () => {
    setVenta({
      idVenta: new Date(),
      fecha: '',
      idUsuario: '',
      idProducto: '',
      nombre: '',
      cantVendida: '',
      total: '',
      ganancia: ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

    return (
      <div className='fondo'>
        <Barra/>
        <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
            <Modal.Title className="text-center">Registrar venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group controlId="formID">
            <Form.Label>ID</Form.Label>
            <Form.Control
            type="text"
            name="idVenta"
            value={new Date()}
            onChange={handleInputChange}
            readOnly/>
          </Form.Group>
          <br></br>
          <Form.Group controlId="formFecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
            type="date"
            name="fecha"
            value={venta.fecha}
            onChange={handleInputChange}/>
          </Form.Group>
          <br></br>
          <Form.Group controlId="formIdUsuario">
            <Form.Label>ID Vendedor</Form.Label>
            <Form.Control
            type="number"
            name="idUsuario"
            value={venta.idUsuario}
            onChange={handleInputChange}/>
          </Form.Group>
          <br></br>
          <Form.Group controlId="formIdProducto">
            <Form.Label>Producto</Form.Label>
            <Form.Control
            as="select"
            name="idProducto"
            onChange={handleInputChange}>
              {productos.map(producto => (
              <option key={producto.idProducto} value={producto.idProducto}>{producto.idProducto + ' ' + producto.nombre}</option>))}
            </Form.Control>
          </Form.Group>
          <br></br>
          <Form.Group controlId="formIdProducto">
            <Form.Label>Cantidad a vender</Form.Label>
            <Form.Control
            type="number"
            name="cantVendida"
            value={venta.cantVendida}
            onChange={handleInputChange}/>
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" onClick={registrarVentas}>Agregar</Button>
        </Modal.Footer>
        </Modal>

        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh'}}>
        <Row>
          <Col>
          <div className="tabla">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>ID Vendedor</th>
                <th>ID Producto</th>
                <th>Nombre del producto</th>
                <th>Cantidad vendida</th>
                <th>Subtotal</th>
                <th>Ganancia</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta.idVenta}>
                  <td>{venta.idVenta}</td>
                  <td>{new Date(venta.fecha).toLocaleDateString('es-ES',
                  {year: 'numeric', month: '2-digit', day: '2-digit'})}</td>
                  <td>{venta.idUsuario}</td>
                  <td>{venta.idProducto}</td>
                  <td>{venta.nombre}</td>
                  <td>{venta.cantVendida}</td>
                  <td>${venta.total}</td>
                  <td>${venta.ganancia}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
          <Button variant="success" onClick={openModal}>Agregar venta</Button>
          </Col>
        </Row>
      </Container>
      </div>
    );
}