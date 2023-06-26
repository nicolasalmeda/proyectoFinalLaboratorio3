const mysql = require('mysql')
const db = require('../DataBases/db')
const bcrypt = require('bcrypt');

const usuariosControllers = {
  createUser: async (req,res) => {
    const user = req.body.name;
    const hashedPassword = await bcrypt.hash(req.body.password,10);

    try {
      db.getConnection(async (err, connection) => {
        if (err) throw (err)

        const sqlSearch = "SELECT * FROM usuario WHERE user = ?";
        const search_query = mysql.format(sqlSearch, [user]);
        const sqlInsert = "INSERT INTO usuario VALUES (0, ?, ?)";
        const insert_query = mysql.format(sqlInsert, [user, hashedPassword]);

        connection.query(search_query, async (err, searchResult) => {
          if (err) {
            connection.release();
            console.error("Error al buscar resultados: ", err);
            res.status(500).send("Error del servidor al crear un nuevo usuario.");
            return;
          }

          console.log("------> Buscando Resultados");
          console.log(searchResult.length);

          if (searchResult.length !== 0) {
            connection.release();
            console.log("-------> Usuario ya existe");
            res.sendStatus(409);
          } else {
            connection.query(insert_query, (err, insertResult) => {
              connection.release();
              if (err) {
                console.error("Error al insertar nuevo usuario: ", err);
                res.status(500).send("Error del servidor al crear un nuevo usuario.");
              } else {
                console.log("--------> Nuevo Usuario Creado");
                console.log(insertResult.insertId);
                res.sendStatus(201);
              }
            });
          }
        });
      });
    }catch(error){
    console.error("Error al crear un nuevo usuario: ", error);
      res.status(500).send("Error del servidor al crear un nuevo usuario.");
    }
  }
}

module.exports = {usuariosControllers};