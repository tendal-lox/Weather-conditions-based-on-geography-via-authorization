'use strict'

const {insertRecord} = require('./dataBase')
const {generateToken} = require('./jwtTokenManagement')
const {mailsender} = require('./mailSenderFunction')

exports.insertRecordFuncHandler = (name, userName, email) => {
    insertRecord(name, userName, email, async (err, data) => {
        if (err)
            logger.error(err)

        const generatedToken = await generateToken(data.insertId)
        mailsender(email, generatedToken)
    })
}