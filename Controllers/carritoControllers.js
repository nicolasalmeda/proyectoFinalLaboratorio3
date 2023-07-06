const db = require('../DataBases/db')
const mysql = require('mysql')
const { generarFecha } = require('../Utils/Utils')

const carritoControllers = {

  getAllCarritos : (req,res) => {
    try{
      db.getConnection(async (err,connection) => {
        if(err) throw err
        const query = 'SELECT * FROM carrito'
        db.query(query, async (err, result) => {
          connection.release()
          if(err){
            console.log('Error al obtener los carritos: ', err)
            res.status(500).send('Error del servidor al obtener las marcas')
          }else{
              const carritos = result.map(carrito => {
              const { cart, ...resto } = carrito;
              return { ...resto, cart: JSON.parse(cart) };
            });
            res.status(200).json(carritos)
          }
        })

      })
    }catch(error){
      console.error('Error al encontrar los carritos: ', error);
      res.status(500).send('Error del servidor al encontrar un carrito.');
    }
  },

  getOneCarrito : (req,res) => {
    const id = req.params.id

    try{
      db.getConnection( async (err,connection) => {
        if(err) throw err
        const query = 'SELECT * FROM carrito WHERE id = ?'
        const queryOneCarrito = mysql.format(query, [id])
        
        connection.query(queryOneCarrito, (err , result) => {
          connection.release()
          if(err) {
            console.log('Error al encontrar el carrito: ', err);
            res.status(500).send('Error del servidor al encontrar un carrito');
            return;
          }else {
            if(result.length > 0){
                const carritos = result.map(carrito => {
                const { cart, ...resto } = carrito;
                return { ...resto, cart: JSON.parse(cart) };
              });
              res.status(200).json(carritos)
            }else{
              console.log('Carrito no encontradao');
              res.status(404).send('Carrito no encontrado');
            }
          }
        })
      })

    }catch(err){
      console.error('Error al encontrar un carrito: ', err);
      res.status(500).send('Error del servidor al encontrar un carrito.');
    }
  },

  createCarrito : (req,res) => {
    const fecha = generarFecha()
    const {user_id,cart} = req.body
    // const jsonCart = JSON.stringify(req.body.cart)
    try{
      db.getConnection(async (err,connection) => {
        if(err) throw err
        const query = 'INSERT INTO carrito (user_id, fecha, cart) VALUES (?, ?, ?)'
        const createQuery = mysql.format(query, [user_id,fecha,JSON.stringify(cart)])
        connection.query(createQuery,async (err,result) => {
          connection.release()
          if(err){
            console.log('Error al crear el carrito: ', err);
            res.status(500).send('Error del servidor al crear un carrito');
            return;

          }else{
            console.log('Nuevo carrito creado');
            res.sendStatus(201);
          }
        } )
      })  

    }catch(err){
      console.error('Error al crear un carrito: ', err);
      res.status(500).send('Error del servidor al crear un carrito.');
    }
    
  },

  updateCarrito : (req,res) => {
  const id = req.params.id
  const {user_id,fecha,cart} = req.body
  try{
    db.getConnection(async (err,connection) => {
      if(err) throw err 
      const query = 'UPDATE carrito SET user_id = ?, fecha = ?, cart = ? WHERE id= ?'
      const updateQuery = mysql.format(query,[user_id,fecha,JSON.stringify(cart),id])
      connection.query(updateQuery , async (err, result) => {
        connection.release()
        if(err){
          console.log('Error al actualizar el carrito: ', err);
          res.status(500).send('Error del servidor al actualizar un carrito');
          return;
        }else{
          if(result.affectedRows > 0){
            console.log('Carrito actualizado exitosamente');
              res.sendStatus(200)
          }else{
            console.log('No se encontro el carrito')
            res.sendStatus(404)
          }

        }
      })
      
    })
  } catch(err) {
    console.error('Error al actualizar un carrito: ', err);
      res.status(500).send('Error del servidor al actualizar un carrito');
  }
  
  },

  deleteCarrito : (req,res) => {
    const id= req.params.id

    try{
      db.getConnection(async (err,connection) => {
        if(err) throw err
        const query = 'DELETE FROM carrito WHERE id = ?'
        const queryDelete = mysql.format(query,[id])
        connection.query(queryDelete, async (err, result) => {
          connection.release()
          if(err){
          console.log('Error al eliminar el carrito: ', err);
          res.status(500).send('Error del servidor al eliminar un carrito');

          }else{
            if(result.affectedRows > 0){
              console.log('Carrito borrado')
              res.sendStatus(200);
            }else{
              console.log('Carrito no encontrado')
              res.sendStatus(404)
            }

          }
        })
      })

    }catch(err){
      console.error('Error al eliminar un carrito: ', err);
      res.status(500).send('Error del servidor al eliminar un carrito');
    }
  }

}

module.exports={carritoControllers}