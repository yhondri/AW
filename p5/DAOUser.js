'use strict'

const { response } = require("express");

class DAOUser {
    constructor(pool) {
        this.pool = pool;
    }

    checkUser(email, password, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                const sql = "SELECT * FROM user WHERE email = ? AND password = ?";
                let userData = [email, password];
                connection.query(sql, userData, function(err, result) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"), false);
                    } else {
                        callback(null, result);
                    }
                });
            }
        });
    }
}

module.exports = DAOUser;