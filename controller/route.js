const router = require('express').Router()
const {enterMailFunc, recoveryFunc, confirmAccessFunc, getWeatherFunc, logoutFunc} = require('../services/controllerFunctions')
const {userValidation} = require('../middleWares/authentication')

router.get('/insertOldMembers', recoveryFunc)

router.post('/signIn', enterMailFunc)

router.get('/verify', confirmAccessFunc)

router.get('/weatherStatus', userValidation, getWeatherFunc)

router.get('/logout', logoutFunc)

module.exports = router