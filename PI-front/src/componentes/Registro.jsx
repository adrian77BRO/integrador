import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Registro = () => {
  const navegar = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [apePat, setApePat] = useState("");
  const [apeMat, setApeMat] = useState("");
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const handleRegistro = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if(email === ""){
      setErrorEmail("Campo vacío");
      return;
    } else if(!emailRegex.test(email)){
      setErrorEmail("Correo inválido");
      return;
    } else{
      setErrorEmail('');
    }

    if(password === ""){
      setErrorPassword("Correo requerido");
      return;
    } else if(!passwordRegex.test(password)){
      setErrorPassword("Contraseña requerida");
      return;
    } else{
      setErrorPassword('');
    }

    if(idUsuario.toString() === '' || nombre === '' || apePat === '' || apeMat === ''){
      alert("Llenar todos los campos");
      return;
    }
    if(parseInt(idUsuario) < 1000 || parseInt(idUsuario) > 9999){
      alert("ID debe ser de 4 dígitos");
      return;
    }

    if(errorEmail === '' && errorPassword === '' && idUsuario.toString() !== ''
    && nombre !== '' && apePat !== '' && apeMat !== ''){
      axios.post('http://localhost:8080/registro', { idUsuario, nombre, apePat, apeMat, email, password })
      .then(res => {
        if (res.data === "fail") {
          alert("Usuario ya existente");
        } else {
          alert("Usuario registrado exitosamente ");
          navegar('/');
        }
      })
      .catch(err => {
        console.log(err);
        alert("Error al agregar usuario "+ err);
      })
    }
  };

  return (
    <div className="fondo" style={{height:'100vh'}}>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh'}}>
        <Row>
          <Col>
          <Card id="registro" className="d-flex justify-content-center align-items-center">
          <h2>Registro de usuarios</h2>
          <br></br>
          <Form onSubmit={handleRegistro}>
          <Container className="d-flex justify-content-center align-items-center">
            <Row>
              <Col>
              <Form.Group controlId="formIDusuario">
              <Form.Label>ID</Form.Label>
              <Form.Control
              type="number"
              value={idUsuario}
              onChange={(e) => setIdUsuario(e.target.value)}/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="formEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
              type="email"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            {errorEmail && <p className="text-danger">{errorEmail}</p>}
            <br></br>
            <Form.Group controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            {errorPassword && <p className="text-danger">{errorPassword}</p>}
            </Col>
            <Col>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
              type="text"
              placeholder="Ingrese su nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="formPaterno">
              <Form.Label>Apellido paterno</Form.Label>
              <Form.Control
              type="text"
              placeholder="Apellido paterno"
              value={apePat}
              onChange={(e) => setApePat(e.target.value)}/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="formMaterno">
              <Form.Label>Apellido materno</Form.Label>
              <Form.Control
              type="text"
              placeholder="Apellido materno"
              value={apeMat}
              onChange={(e) => setApeMat(e.target.value)}/>
            </Form.Group>
            </Col>
            </Row>
          </Container>
            <br></br>
            <Button variant="success" type="submit">
                Registrar
            </Button>
          </Form>
          </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};