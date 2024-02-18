const express = require("express");
const mysql = require("mysql");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;

const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "a1b2c3d4",
  database: "papeleria",
});

conexion.connect((error) => {
  if (error) {
    console.error("Error al conectar a la base de datos: ", error);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

// Ruta para iniciar sesión
app.post("/login", (req, res) => {
	const { email, password } = req.body;
	const consulta = "SELECT * FROM Usuario WHERE email = ? AND contrasena = ?";

	conexion.query(consulta, [email, password], (err, data) => {
    if (err) {
      throw err;
    }
    if(data.length > 0){
      res.json("exito");
    } else{
      res.json("fail");
    }
	});
});

// Ruta para registrar usuarios
app.post('/registro', (req, res) => {
	const { idUsuario, nombre, apePat, apeMat, email, password } = req.body;
  const consulta = "SELECT * FROM Usuario WHERE email = ? OR idUsuario = ?";
  const insertar = 'INSERT INTO Usuario (idUsuario, nombre, apePat, apeMat, email, contrasena) VALUES (?,?,?,?,?,?)';
  conexion.query(consulta, [email, idUsuario], (err, data) => {
    if (err) {
        throw err;
    }
    if(data.length > 0){
      res.json("fail");
    } else {
      conexion.query(insertar, [idUsuario, nombre, apePat, apeMat, email, password], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
      });
    }
  });
});

// Ruta para obtener productos
app.get('/regProd', (req, res) => {
	const { nombre, marca, existencia, precioAdq, precioVenta, presentacion, clasificacion } = req.body;
    const consultaProd = 'SELECT * FROM Producto ORDER BY nombre';
    conexion.query(consultaProd, [nombre, marca, existencia, precioAdq, precioVenta, presentacion, clasificacion], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

// Ruta para agregar productos
app.post('/regProd', (req, res) => {
	const { idProducto, nombre, marca, existencia, precioAdq, precioVenta, presentacion, clasificacion } = req.body;
  const consultaProd = 'SELECT * FROM Producto WHERE idProducto = ?';
    conexion.query(consultaProd, [idProducto], (err, result) => {
        if (err) {
            throw err;
        }
        if(result.length > 0){
          res.json("El ID ya existe");
        } else {
          const insertProd = 'INSERT INTO Producto (idProducto, nombre, marca, existencia, precioAdq, precioVenta, presentacion, clasificacion) VALUES (?,?,?,?,?,?,?,?)';
          conexion.query(insertProd, [idProducto, nombre, marca, existencia, precioAdq, precioVenta, presentacion, clasificacion], (err, result) => {
            if (err) {
              throw err;
            }
            res.json("Producto agregado exitosamente");
          });
        }
    });
});

// Ruta para eliminar productos
app.delete('/regProd/:idProducto', (req, res) => {
  const elimProd = "DELETE FROM Producto WHERE idProducto = ?";
  conexion.query(elimProd, [req.params.idProducto], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// Ruta para modificar productos
app.put('/regProd/:idProducto', (req, res) => {
  const id = req.params.idProducto;
  const { existencia, precioAdq, precioVenta, presentacion, clasificacion } = req.body;
  const modProd =`UPDATE Producto SET existencia = (existencia + ?), precioAdq = ?, precioVenta = ?, presentacion = ?, clasificacion = ? WHERE idProducto = ?`;
  conexion.query(modProd, [existencia, precioAdq, precioVenta, presentacion, clasificacion, id],(err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// Ruta para obtener las ventas
app.get('/regVenta', (req, res) => {
	const { idVenta, fecha, idUsuario, idProducto, nombre, cantVendida, total, ganancia } = req.body;
    const consultaVentas = 'SELECT idVenta, fecha, Usuario.idUsuario, Producto.idProducto, Producto.nombre, cantVendida, (Producto.precioVenta * cantVendida) AS total, cantVendida*(Producto.precioVenta - Producto.precioAdq) AS ganancia FROM Venta LEFT JOIN Producto ON Venta.idProducto = Producto.idProducto INNER JOIN Usuario ON Venta.idUsuario = Usuario.idUsuario ORDER BY fecha DESC';
    conexion.query(consultaVentas, [idVenta, fecha, idUsuario, idProducto, nombre, cantVendida, total, ganancia], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

// Ruta para registrar ventas
app.post('/regVenta', (req, res) => {
  const { idVenta, fecha, idUsuario, idProducto, cantVendida } = req.body;
  const consProd = "SELECT * FROM Producto INNER JOIN Usuario WHERE idProducto = ? AND idUsuario = ?";
  conexion.query(consProd, [idProducto, idUsuario], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      return res.send('Usuario no existente');
    }

    const producto = result[0];
    const cantDisp = producto.existencia;
    if (cantVendida > cantDisp) {
      return res.send('Cantidad insuficiente en el inventario');
    }

    const modVenta = `UPDATE Producto SET existencia = ${cantDisp - cantVendida} WHERE idProducto = ?`;
    conexion.query(modVenta, [idProducto], (err) => {
      if (err) {
        throw err;
      }
      const regVenta = "INSERT INTO Venta (idVenta, fecha, idUsuario, idProducto, cantVendida) VALUES (?,?,?,?,?)";
      conexion.query(regVenta, [idVenta, fecha, idUsuario, idProducto, cantVendida], (err) => {
        if (err) {
          throw err;
        }
        res.send('Venta registrada e inventario actualizado');
      });
    });
  });
});

app.get('/', (req, res) => {
	res.send('Bienvenido a mi API');
});

app.listen(port, () => {
  console.log(`Servidor backend iniciado en el puerto ${port}`);
});