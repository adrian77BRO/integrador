import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logoST.jpeg';
import axios from 'axios';

export function Login() {
    const navegar = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setEmail('');
      setPassword('');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

      if(email === ""){
        setErrorEmail("Correo requerido");
      } else if(!emailRegex.test(email)){
        setErrorEmail("Correo inválido");
      } else{
        setErrorEmail('');
      }

      if(password === ""){
        setErrorPassword("Contraseña requerida");
      } else if(!passwordRegex.test(password)){
        setErrorPassword("Contraseña inválida");
      } else{
        setErrorPassword('');
      }

      if(errorEmail === '' && errorPassword === ''){
        axios.post('http://localhost:8080/login',{ email, password })
        .then((res) => {
          if (res.data === "exito") {
            alert("Bienvenido usuario");
            navegar('/menu');
          } else {
            alert("Credenciales incorrectas");
          }
        })
        .catch((err) => {
          console.log(err);
          alert('Error en el servidor');
        });
      }
    }
  
    return (
      <div className="fondo" style={{height:'100vh'}}>
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh'}}>
        <Row>
          <Col>
          <Card id="login" className="d-flex justify-content-center align-items-center">
          <h1 className="text-center fs-3">Iniciar sesión</h1>
          <br></br>
          <img className='logo' src={logo} alt=''/>
          <br></br>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
              </Form.Group>
              {errorEmail && <p className="text-danger">{errorEmail}</p>}
              <br></br>
              <Form.Group controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>
              {errorPassword && <p className="text-danger">{errorPassword}</p>}
              <br></br>
              <Container className="d-flex justify-content-center align-items-center">
              <Button variant="success" type="submit">
                Ingresar
              </Button>
              </Container>
              <br></br>
              <Container className="d-flex justify-content-center align-items-center">
              <Link to='/registro' className="btn btn-success" type="submit">
                Registrar
              </Link>
              </Container>
            </Form>
          </Card>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }