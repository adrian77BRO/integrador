import logo from '../img/logoST.jpeg';
import invent from '../img/inventario.jpg';
import venta from '../img/punto-venta.jpg';
import { Barra } from '../componentes/Barra';
import { Container, Row, Col, Carousel } from 'react-bootstrap';

export function Menu () {
    return (
      <div className="fondo">
        <Barra/>
        <Container className="d-block w-100 d-flex justify-content-center">
          <Row>
          <Col>
          <Carousel id='carrusel'>
            <Carousel.Item>
              <img
              className="imagen d-block w-100"
              src={logo}
              alt=""/>
              <Carousel.Caption>
                <h3 className='text-secondary'>StockSense</h3>
                <p className='text-secondary'>Bienvenido a su app para gestión de inventario y punto de venta</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
              className="imagen d-block w-100"
              src={invent}
              alt=""/>
              <Carousel.Caption>
                <h3 >Inventario</h3>
                <p>Aquí podrá hacer un manejo de un inventario en el que puede administrar mejor sus productos a la venta,
                  saber su cantidad en existencia para poder saber que productos están disponibles para su venta.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
              className="imagen d-block w-100"
              src={venta}
              alt=""/>
              <Carousel.Caption>
                <h3>Punto de venta</h3>
                <p>Aquí podrá hacer un manejo de los cálculos de los precios totales de sus ventas, así como calcular
                  las ganancias generadas</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          </Col>
        </Row>
      </Container>
      </div>
    );
  };