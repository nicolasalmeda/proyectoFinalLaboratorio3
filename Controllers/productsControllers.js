const mysql = require('mysql')
const db = require('../DataBases/db');
const { generarId } = require('../Utils/Utils');


const productsControllers = {

  getAllProducts : (req,res) => {
    
      // const query = 'SELECT * FROM productos';
      const query = 'SELECT p.*, b.name AS brand_name FROM productos p JOIN brands b ON p.brand_id = b.id'
      db.query(query,(error,results) => {
        if(error){
          console.error('Error al obtener los productos: ',error);
          res.status(500).send('Error del servidor al obtener los productos.');
        }else{
          res.status(200).json(results);
        }
      })
    },

  getOneProduct : (req,res) => {
    const id = req.params.id
    try{

      db.getConnection( async (err,connection) => {
        if(err) throw err
        const query = 'SELECT * FROM productos WHERE id = ?'
        const getOneQuery = mysql.format(query,[id])
        db.query(getOneQuery, async (err, result) => {
          connection.release()
          if(err){
            console.log('Error al encontrar el producto: ' , err)
            res.status(500).send('Error del servidor al encontrar un producto')
            return
          }else{
            if(result.length > 0){
              res.status(200).json(result)
            }else{
              console.log('producto no encontrado')
              res.send('Producto no encontrado')
            }
          }
        })
      })
      
    }catch(error){
      console.error("Error al encontrar el producto: ", error);
      res.status(500).send("Error del servidor al encontrar un producto.");
    }
  },

  createProductos : (req,res) => {
    const {name,price,weight,height,description,ram,storage,camera,display,battery,quantity,brand_id,image,stock} = req.body
    const id = generarId()
    try{
    db.getConnection(async(err,connection) => {
      if(err) throw err
      const query = 'INSERT INTO productos VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
      const insertQuery = mysql.format(query,[id,name,price,weight,height,description,ram,storage,camera,display,battery,quantity,brand_id,image,stock])
      connection.query(insertQuery, async (err,insertResult) => {
        connection.release()
        if(err){
          console.log('Error al crear el producto: ' , err)
          res.status(500).send('Error del servidor al crear un producto')
          return
        }else{
                console.log("--------> Nuevo producto Creado");
                console.log(insertResult.insertId);
                res.sendStatus(201);
        }
      })
    })
    }catch(error){
      console.error("Error al crear el producto: ", error);
      res.status(500).send("Error del servidor al crear un producto.");
    }

  },

  updateProducto : (req,res) => {
    const id = req.params.id
    const {name,price,weight,height,description,ram,storage,camera,display,battery,quantity,brand_id,image,stock} = req.body

    try{
      

db.getConnection( async (err, connection) => {
  if(err) throw err
  const query = 'UPDATE productos SET name = ?,price = ?, weight = ?, height= ?,description = ?, ram = ?, storage = ?, camera = ?,display = ?, battery = ?, quantity = ?, brand_id = ?,image = ?, stock = ? WHERE id = ?'
  const updateQuery = mysql.format(query, [name,price,weight,height,description,ram,storage,camera,display,battery,quantity,brand_id,image,stock,id])

  connection.query(updateQuery,async (err, updateResult) => {
    connection.release()
    if(err){
      console.error("Error al actualizar el producto: ", err);
      res.status(500).send("Error del servidor al actualizar el producto.");
    }else{
      if (updateResult.affectedRows > 0) {
        console.log("Producto actualizado exitosamente");
        res.sendStatus(200);
    } else {
        console.log("No se encontró el Producto");
        res.sendStatus(404);
    }
    }

  })
})
    }catch(error){
      console.error("Error al actualizar el producto: ", error);
      res.status(500).send("Error del servidor al actualizar el producto.");
    }
  },

  deleteProducto: (req,res) => {
    const id = req.params.id
    try{
      db.getConnection(async (err,connection) => {
        if(err) throw err
        const query = 'DELETE FROM productos where id = ?'
        const deleteQuery = mysql.format(query,[id])

        connection.query(deleteQuery, async (err, result) => {
          connection.release()
          if(err){
            console.error("Error al eliminar el producto: ", err);
            res.status(500).send("Error del servidor al eliminar el producto.");
          }else {
            if (result.affectedRows > 0) {
              console.log("producto eliminado exitosamente");
              res.sendStatus(200);
          } else {
              console.log("No se encontró el producto");
              res.sendStatus(404);
          }
          }
        } )
      })
    }catch(err){
      console.error("Error al eliminar el producto: ", err);
      res.status(500).send("Error del servidor al eliminar el producto.");
    }
  }

   

  
}

// async function getAll() {
//   try{
//     const query = 'SELECT * FROM products';
//     const results = await db.query(query);
//     res.status(200).json(results)
//   }catch(error){
//     console.error('Error al obtener los productos: ', error);
//     res.status(500).send('Error del servidor al obtener los productos.');
//   }
//   }

module.exports ={productsControllers};