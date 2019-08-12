const mysql = require('mysql'),
    config = require('./mysql_config');



let queryDB = function (sql, values, db) {
    config.database = db;
    const pool = mysql.createPool(config),
    connection = mysql.createConnection(config);
    return new Promise((res, rej) => {
        pool.getConnection(function (err, connection) {
            if (err) rej(err);
            connection.query(sql, values,(error, results) => {
                // 结束会话
                connection.release();
                 // 如果有错误就抛出
                 if (error) rej(error);
                res(results);              
            })
        })
    });
}

module.exports = queryDB;