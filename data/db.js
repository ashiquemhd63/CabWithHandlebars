const mysql = require('mysql2');

const connectionDetails = {
    host: 'localhost',
    user: 'root',
    password: '308568',
    database: 'cab_management_system'
};
 function getConnection(){
    return mysql.createConnection(connectionDetails);
 };

 function executeQuery(query, parameters, callback){
    let connection = getConnection();
    connection.connect();
    connection.query(query, parameters, callback);
    connection.commit();
    connection.end();
    
 }

 module.exports.executeQuery = executeQuery;