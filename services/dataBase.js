const logger = require('pino')({
    mixin() {return {appName: 'dataBase'}},
    transport: {target: 'pino-pretty'}
})
const mysql = require('mysql')

const pool  = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'users_mail',
    connectionLimit: 10
})

exports.insertRecord = (name, userName, email, cb) => {
    pool.query('insert into all_members(name, username, email) values(?, ?, ?)', [name, userName, email],
    (err, data) => {
        if (err)
            logger.error(err)

        cb(null, data)
    })
}

exports.findUserById = (userId, cb) => {
    pool.query('select username from all_members where id = ?', [userId], (err, userData) => {
        if (err)
            logger.error(err)

        cb(null, userData)
    })
}

exports.allUsersFromDb = (givenMail, cb) => {
    pool.query('select email, id from all_members where email = ?', [givenMail], (err, result) => {
        if (err)
            logger.error(err)

        cb(null, result)
    })
}