const mysql = require('mysql')
const db = require('../DataBases/db')
const bcrypt = require('bcrypt');
const { generateAccesToken } = require('../Utils/Utils');

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
              
              if (err) {
                connection.release();
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
  },

  login: async (req,res) => {
      const user = req.body.name;
      const password = req.body.password;
      try{
        db.getConnection(async (err,connection) => {
          if(err) throw (err)
          const sqlSearch = 'SELECT * FROM usuario WHERE user=?'
          const search_query = mysql.format(sqlSearch,[user])
          connection.query(search_query, async (err,result) => {
            connection.release()
            if(err) throw err
            if(result.length === 0){
              console.log('---------> El usuario no existe')
              res.sendStatus(404)
            }else{
              const hashedPassword = result[0].password
              console.log(result);
              if(await bcrypt.compare(password,hashedPassword)){
                console.log('--------> Login existoso')
                console.log('--------> Generando token')
                const token = generateAccesToken({user: user})
                console.log(token);
                res.json({accesToken: token})
              }else{
                console.log('------> contraseña incorrecta');
                res.send('Contraseña incorrecta')
              }
            }
          })
        })

      }catch(error){
        console.error("Error al logerse: ", error);
        res.status(500).send("Error al intentar logearse.");
      }
  },
  deleteUser: async (req, res) => {
    const userId = req.params.id; // Obtener el ID del usuario a eliminar

    try {
        db.getConnection(async (err, connection) => {
            if (err) throw (err);

            const sqlDelete = "DELETE FROM usuario WHERE id = ?";
            const delete_query = mysql.format(sqlDelete, [userId]);

            connection.query(delete_query, (err, result) => {
                connection.release();
                if (err) {
                    console.error("Error al eliminar el usuario: ", err);
                    res.status(500).send("Error del servidor al eliminar el usuario.");
                } else {
                    if (result.affectedRows > 0) {
                        console.log("Usuario eliminado exitosamente");
                        res.sendStatus(200);
                    } else {
                        console.log("No se encontró el usuario");
                        res.sendStatus(404);
                    }
                }
            });
        });
    } catch (error) {
        console.error("Error al eliminar el usuario: ", error);
        res.status(500).send("Error del servidor al eliminar el usuario.");
    }
},
updateUser: async (req, res) => {
  const userId = req.params.id; // Obtener el ID del usuario a actualizar
  const newName = req.body.name; // Nuevo nombre del usuario
  const newHashedPassword = await bcrypt.hash(req.body.password,10); // Nueva contraseña hasheada

  try {
      db.getConnection(async (err, connection) => {
          if (err) throw (err);

          const sqlUpdate = "UPDATE usuario SET user = ?, password = ? WHERE id = ?";
          const update_query = mysql.format(sqlUpdate, [newName, newHashedPassword, userId]);

          connection.query(update_query, (err, result) => {
              connection.release();
              if (err) {
                  console.error("Error al actualizar el usuario: ", err);
                  res.status(500).send("Error del servidor al actualizar el usuario.");
              } else {
                  if (result.affectedRows > 0) {
                      console.log("Usuario actualizado exitosamente");
                      res.sendStatus(200);
                  } else {
                      console.log("No se encontró el usuario");
                      res.sendStatus(404);
                  }
              }
          });
      });
  } catch (error) {
      console.error("Error al actualizar el usuario: ", error);
      res.status(500).send("Error del servidor al actualizar el usuario.");
  }
},
getAllUsers: async (req, res) => {
  try {
      db.getConnection(async (err, connection) => {
          if (err) throw (err);

          const sqlSelect = "SELECT * FROM usuario";
          connection.query(sqlSelect, (err, result) => {
              connection.release();
              if (err) {
                  console.error("Error al obtener los usuarios: ", err);
                  res.status(500).send("Error del servidor al obtener los usuarios.");
              } else {
                  console.log("Usuarios obtenidos exitosamente");
                  res.status(200).json(result);
              }
          });
      });
  } catch (error) {
      console.error("Error al obtener los usuarios: ", error);
      res.status(500).send("Error del servidor al obtener los usuarios.");
  }
}


}

module.exports = {usuariosControllers};