'use strict'

class DAOTasks {
    constructor(pool) {
        this.pool = pool;
    }

    getAllTasks(email, callback) {
        var self = this;
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                const sql = "SELECT tk.id, tk.user, tk.text, tk.done, tg.tag FROM task AS tk LEFT JOIN tag AS tg ON tk.id = tg.taskId WHERE tk.user = ?";
                let userData = [email];
                connection.query(sql, userData, function(err, result) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"), false);
                    } else {
                        self.mapTaskAndTags(result, callback);
                    }
                });
            }
        });
    }

    mapTaskAndTags(result, callback) {
        var tasks = [];
        for (let row of result) {
            if (!tasks.some(v => v.id == row.id)) {
                let rowTask = result.filter(v => v.id == row.id)
                let tags = [];
                for (let task of rowTask) {
                    tags.push(task.tag);
                }

                let task = {
                    id: row.id,
                    text: row.text,
                    done: row.done,
                    tags: tags
                };

                tasks.push(task);
            }
        }
        callback(null, tasks);
    }

    insertTask(task, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                const sql = "INSERT INTO task(id, user, text, done) VALUES (?,?,?,?);";
                let userData = [task.id, task.user, task.text, task.done];
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

    insertTag(taskId, tag, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                const sql = "INSERT INTO tag(taskId, tag) VALUES (?,?);";
                let tagData = [taskId, tag];
                connection.query(sql, tagData, function(err, result) {
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

module.exports = DAOTasks;