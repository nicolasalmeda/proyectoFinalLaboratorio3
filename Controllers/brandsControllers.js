const db = require('../DataBases/db')
const mysql = require('mysql')

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
  },

  getOneBrand: (req, res) => {
    const id = req.params.id;
    try {
      db.getConnection(async (err, connection) => {
        if (err) throw err;
        const query = 'SELECT * FROM brands WHERE id = ?';
        const getOneQuery = mysql.format(query, [id]);
        db.query(getOneQuery, async (err, result) => {
          connection.release();
          if (err) {
            console.log('Error al encontrar la marca: ', err);
            res.status(500).send('Error del servidor al encontrar una marca');
            return;
          } else {
            if (result.length > 0) {
              res.status(200).json(result);
            } else {
              console.log('Marca no encontrada');
              res.status(404).send('Marca no encontrada');
            }
          }
        });
      });
    } catch (error) {
      console.error('Error al encontrar la marca: ', error);
      res.status(500).send('Error del servidor al encontrar una marca.');
    }
  },

  createBrand: (req, res) => {
    const { name } = req.body;
    const id = req.params.id;
    try {
      db.getConnection(async (err, connection) => {
        if (err) throw err;
        const query = 'INSERT INTO brands VALUES (?, ?)';
        const insertQuery = mysql.format(query, [id, name]);
        connection.query(insertQuery, async (err, insertResult) => {
          connection.release();
          if (err) {
            console.log('Error al crear la marca: ', err);
            res.status(500).send('Error del servidor al crear una marca');
            return;
          } else {
            console.log('Nueva marca creada');
            res.sendStatus(201);
          }
        });
      });
    } catch (error) {
      console.error('Error al crear la marca: ', error);
      res.status(500).send('Error del servidor al crear una marca.');
    }
  },

  updateBrand: (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    try {
      db.getConnection(async (err, connection) => {
        if (err) throw err;
        const query = 'UPDATE brands SET name = ? WHERE id = ?';
        const updateQuery = mysql.format(query, [name, id]);

        connection.query(updateQuery, async (err, updateResult) => {
          connection.release();
          if (err) {
            console.error('Error al actualizar la marca: ', err);
            res.status(500).send('Error del servidor al actualizar la marca.');
          } else {
            if (updateResult.affectedRows > 0) {
              console.log('Marca actualizada exitosamente');
              res.sendStatus(200)
            }else{
              console.log('No se encontro la marca')
              res.sendStatus(404)
            }
          }
        })
      })
    }catch(error){
      console.error('Error al actualizar la marca: ', error);
    res.status(500).send('Error del servidor al actualizar la marca.');
    }
  },

  deleteBrand: (req, res) => {
    const id = req.params.id;
    try {
      db.getConnection((err, connection) => {
        if (err) throw err;
        const query = 'DELETE FROM brands WHERE id = ?';
        const deleteQuery = mysql.format(query, [id]);

        connection.query(deleteQuery, (err, result) => {
          connection.release();
          if (err) {
            console.error('Error al eliminar la marca: ', err);
            res.status(500).send('Error del servidor al eliminar la marca.');
          } else {
            if (result.affectedRows > 0) {
              console.log('Marca eliminada exitosamente');
              res.sendStatus(200);
            } else {
              console.log('No se encontró la marca');
              res.sendStatus(404);
            }
          }
        });
      });
    } catch (error) {
      console.error('Error al eliminar la marca: ', error);
      res.status(500).send('Error del servidor al eliminar la marca.');
    }
  }


}

module.exports={brandsControllers};