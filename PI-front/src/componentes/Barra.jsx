import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export function Barra(){
    return (
        <Navbar id="barra" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} className="link" to="/menu">Menú</Nav.Link>
            <Nav.Link as={Link} className="link" to="/regProd">Inventario</Nav.Link>
            <Nav.Link as={Link} className="link" to="/regVenta">Ventas</Nav.Link>
            <NavDropdown title="Otras opciones" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/">Cerrar sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}