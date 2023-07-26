'use strict'

exports.userValidation = (req, res, next) => {
    if (req.session.isAuth === true)
        next()
    else
        res.sendStatus(401)
}