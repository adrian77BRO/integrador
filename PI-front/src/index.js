import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Registro } from './componentes/Registro';
import { Menu } from './componentes/Menu';
import { RegistrarProducto } from './componentes/RegistrarProducto';
import { RegistrarVenta } from './componentes/RegistrarVentas';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const Rutas = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/regProd" element={<RegistrarProducto/>} />
        <Route path="/regVenta" element={<RegistrarVenta/>} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Rutas/>
);
