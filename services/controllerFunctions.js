'use strict'

const {getAllMembersRequest, getWeatherRequest} = require('./axiosApiCalls')
const {insertRecord, findUserById, allUsersFromDb} = require('./dataBase')
const {generateToken, verificationFunc} = require('./jwtTokenManagement')
const {mailsender} = require('./mailSenderFunction')
const {insertRecordFuncHandler} = require('./handlerFunctions')
const logger = require('pino')({
    mixin() {return {appName: 'controllerFunctions'}},
    transport: {target: 'pino-pretty'}
})
const async = require('async')

exports.recoveryFunc = async (req, res) => {
    const listOfAllMembers = await getAllMembersRequest()

    async.each(listOfAllMembers, eachUser => {
        insertRecord(eachUser.name, eachUser.username, eachUser.email, (err, data) => {
            if (err)
                logger.error(err)

            logger.info(data, 'Data stored')
        })
    })
}

exports.enterMailFunc = async (req, res) => {
    const {name, userName, email} = req.body

    allUsersFromDb(email, async (err, allUsers) => {
        if (err)
            logger.error(err)

        if (allUsers.length === 0) {
            return insertRecordFuncHandler(name, userName, email)
        }

        for (let user of allUsers) {
            if (user.email !== email) {
                insertRecordFuncHandler(name, userName, email)
            }
            else {
                const generatedToken = await generateToken(user.id)
                mailsender(email, generatedToken)
                logger.info('User already exist')
            }
        }
    })
}

exports.confirmAccessFunc = async (req, res) => {
    const {token} = req.query
    const userId = await verificationFunc(token)

    findUserById(userId.id, (err, userObject) => {
        if (err)
            logger.error(err)
        
        if (!userId)
            return res.sendStatus(401)

        req.session.isAuth = true
        
        for (let user of userObject) {
            res.send(`welcome ${user.username} with userId: ${userId.id}`)
        }
    })
}

exports.getWeatherFunc = async (req, res) => {
    const data = await getWeatherRequest()
    res.send(data)
}

exports.logoutFunc = (req, res) => {
    req.session.destroy()
}