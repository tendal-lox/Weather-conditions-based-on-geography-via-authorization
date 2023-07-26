const express = require('express')
const app = express()
require('dotenv').config()
const router = require('./controller/route')
const logger = require('pino')({
    mixin() {return {appName: 'app.js'}},
    transport: {target: 'pino-pretty'}
})
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const session = require('express-session')

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(express.urlencoded({extended: false}))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(router)

app.listen(process.env.PORT, (err) => {
    if (err) {
        logger.error({'err msg': 'Something wentwrong'}, err)
    }
    logger.info('Web server connected')
})