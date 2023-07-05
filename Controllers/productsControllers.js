const db = require('../DataBases/db');

const productsControllers = {

  getAllProducts : (req,res) => {
    
      // const query = 'SELECT * FROM productos';
      const query = 'SELECT p.*, b.name AS brand_name FROM productos p JOIN brands b ON p.brand_id = b.id'
      db.query(query,(error,results) => {
        if(error){
          console.error('Error al obtener los productos: ',error);
          res.status(500).send('Error del servidor al obtener los productos.');
        }else{
          console.log(results);
          res.status(200).json(results);
        }
      })

    
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