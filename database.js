const mysql = require('mysql');
const { promisify }= require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('SE PERDIO LA CONEXION A LA BASE DE DATOS.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('LA BASE DE DATOS TIENE MUCHAS CONEXIONES');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('SE NEGO LA CONEXION A LA BASE DE DATOS');
    }
  }

  if (connection) connection.release();
  console.log('BASE DE DATOS CONECTADA');

  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;
