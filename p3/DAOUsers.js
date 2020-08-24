'use strict'


class DAOUsers {
    constructor(pool) {
        this.pool = pool;
    }

    isUserCorrect(email, password, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                const sql = "SELECT email FROM user WHERE email = ? AND password = ?";
                let userData = [email, password];
                connection.query(sql, userData, function(err, result) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"), false);
                    } else {
                        callback(null, result.length > 0);
                    }
                });
            }
        });
    }

    getUserImageName(email, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                const sql = "SELECT email, img FROM user WHERE email = ?";
                let userData = [email];
                connection.query(sql, userData, function(err, result) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"), false);
                    } else if (result.length > 0 && result[0].email.length > 0) {
                        if (result.img != null) {
                            callback(null, resutl);
                        } else {
                            callback(new Error("No se ha encontrado la imagen"), false);
                        }
                    } else {
                        callback(new Error("No se ha encontrado el usuario"), false);
                    }
                });
            }
        });
    }

    insertUser(user, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                const sql = "INSERT INTO user(email, password) VALUES (?,?);";
                let userData = [user.email, user.password];
                connection.query(sql, userData, function(err, result) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"), false);
                    } else {
                        callback(null, true);
                    }
                });
            }
        });
    }
}

module.exports = DAOUsers;