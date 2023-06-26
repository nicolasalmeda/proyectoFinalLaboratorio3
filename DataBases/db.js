const mysql = require('mysql');

const db = mysql.createPool({
  connectionLimit: 100,
  host: '127.0.0.1',
  user: 'root',
  password: 'colegioprivado',
  database: 'tresjota',
  port: '3306'
})

db.getConnection((error,connection) => {
  if(error){
    console.error('Error al conectar a la base de datos: ', error);
  }else{
    console.log('Conexion existosa a la base de datos ' + connection.threadId );
  }
})

module.exports = db;