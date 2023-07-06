const jwt = require('jsonwebtoken')
const {v4: uuidv4} = require('uuid')

function generateAccesToken(user) {
  return jwt.sign(user, '12345', {expiresIn: '30m'})
}

function generarId(){
  return uuidv4()
}

function generarFecha(){
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate
}

module.exports = {generateAccesToken,generarId,generarFecha}