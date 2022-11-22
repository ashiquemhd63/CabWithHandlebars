const db = require('./db');

function getAll(callback){
    const sql = "SELECT * FROM passenger"
    db.executeQuery(sql, [], callback);
}

function addOne(First_name, Last_name, Password, Email, Mobile, Address, Dob, Gender, callback){
    const sql = "INSERT INTO passenger (First_name, Last_name, Password, Email, Mobile, Address, Dob, Gender) VALUES (?, ?, ?, ?, ?, ?, ?,?)";
    db.executeQuery(sql, [First_name, Last_name, Password, Email, Mobile, Address, Dob, Gender], callback);
}

module.exports.getAll = getAll;
module.exports.addOne = addOne;