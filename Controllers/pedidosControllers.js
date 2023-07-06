const db = require('../DataBases/db')
const mysql = require('mysql');
const { generarId } = require('../Utils/Utils');

const pedidosControllers = {

  getAllPedidos : (req,res) => {
    const query = 'SELECT * FROM pedidos';
    db.query(query, (error,results) => {
      if(error){
        console.error('Error al obtener los pedidos: ',error);
        res.status(500).send('Error del servidor al obtener los pedidos.');
      }else{
        res.status(200).json(results);
      }
    })
  },

  getOnePedido : (req,res) => {
    const id = req.params.id;
    try {
      db.getConnection(async (err, connection) => {
        if (err) throw err;
        const query = 'SELECT * FROM pedidos WHERE id = ?';
        const getOneQuery = mysql.format(query, [id]);
        db.query(getOneQuery, async (err, result) => {
          connection.release();
          if (err) {
            console.log('Error al encontrar el pedido: ', err);
            res.status(500).send('Error del servidor al encontrar un pedido');
            return;
          } else {
            if (result.length > 0) {
              res.status(200).json(result);
            } else {
              console.log('Pedido no encontrada');
              res.status(404).send('Pedido no encontrada');
            }
          }
        });
      });
    } catch (error) {
      console.error('Error al encontrar un pedido: ', error);
      res.status(500).send('Error del servidor al encontrar un pedido.');
    }
  },
  createPedido: (req, res) => {
    const { cart_id,precioTotal,envio } = req.body;
    const id = generarId();
    try {
      db.getConnection(async (err, connection) => {
        if (err) throw err;
        const query = 'INSERT INTO pedidos VALUES (?, ?, ?, ?)';
        const insertQuery = mysql.format(query, [id, cart_id,precioTotal,envio]);
        connection.query(insertQuery, async (err, insertResult) => {
          connection.release();
          if (err) {
            console.log('Error al crear el pedido: ', err);
            res.status(500).send('Error del servidor al crear el pedido');
            return;
          } else {
            console.log('Nuevo pedido creado');
            res.sendStatus(201);
          }
        });
      });
    } catch (error) {
      console.error('Error al crear un pedido: ', error);
      res.status(500).send('Error del servidor al crear un pedido.');
    }
  },

  getAllPedidosInf : (req,res) => {
    const query = 'select p.*, c.id as user_id,c.fecha as fecha, u.user as user from pedidos p join carrito c on c.id = p.cart_id join usuario u on u.id = c.id;';
    db.query(query, (error,results) => {
      if(error){
        console.error('Error al obtener los pedidos: ',error);
        res.status(500).send('Error del servidor al obtener los pedidos.');
      }else{
        res.status(200).json(results);
      }
    })
  },

  updatePedidos : ( req, res) => {
    const id = req.params.id
    const {cart_id, precioTotal, envio} = req.body
    try{
      db.getConnection(async (err,connection) => {
      if(err) throw err
      const query = 'UPDATE pedidos SET cart_id = ?, precioTotal = ?, envio= ? WHERE id = ?'
      const updateQuery = mysql.format(query, [cart_id,precioTotal,envio,id])
      connection.query(updateQuery, async (err,result)=> {
        connection.release()
        if(err){
          console.error('Error al actualizar el pedido : ', err);
          res.status(500).send('Error del servidor al actualizar el pedido.');
        }else{
          if(result.affectedRows > 0){
            console.log('Pedido actualizado exitosamente');
              res.sendStatus(200)
          }else{
            console.log('No se encontro pedido')
              res.sendStatus(404)
          }

        }
      })
      })

    }catch(err){
      console.error('Error al actualizar un pedido: ', err);
      res.status(500).send('Error del servidor al actualizar un pedido.');
    }
  },

  deletePedidos: (req, res) => {
    const id = req.params.id;
    try {
      db.getConnection((err, connection) => {
        if (err) throw err;
        const query = 'DELETE FROM pedidos WHERE id = ?';
        const deleteQuery = mysql.format(query, [id]);

        connection.query(deleteQuery, (err, result) => {
          connection.release();
          if (err) {
            console.error('Error al eliminar el pedido: ', err);
            res.status(500).send('Error del servidor al eliminar el pedido.');
          } else {
            if (result.affectedRows > 0) {
              console.log('Pedido eliminado exitosamente');
              res.sendStatus(200);
            } else {
              console.log('No se encontró el pedido');
              res.sendStatus(404);
            }
          }
        });
      });
    } catch (error) {
      console.error('Error al eliminar el pedido: ', error);
      res.status(500).send('Error del servidor al eliminar el pedido.');
    }
  }

}

module.exports = {pedidosControllers}