const db = require('../DataBases/db')

const brandsControllers = {
  
  getAllBrands:(req,res) => {
    const query = 'SELECT * FROM brands';
    db.query(query, (error,results) => {
      if(error){
        console.error('Error al obtener las marcas: ',error);
        res.status(500).send('Error del servidor al obtener las marcas.');
      }else{
        res.status(200).json(results);
      }
    })
  }
}

module.exports={brandsControllers};