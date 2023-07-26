'use strict'

const logger = require('pino')({
    mixin() {return {appName: 'jwtTokenManagement'}},
    transport: {target: 'pino-pretty'}
})
const jwt = require('jsonwebtoken')

exports.generateToken = async (userId) => {
    try {
        return jwt.sign({id: userId}, process.env.SECRET_KEY, {expiresIn: '30m'})
    } catch(err) {
        logger.error(err, 'Something went wrong in generating jwt token')
    }
}

exports.verificationFunc = async (token) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY)
    } catch(err) {
        logger.error(err, 'Something went wrong in jwt verification')
    }
}