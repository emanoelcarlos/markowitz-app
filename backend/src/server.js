const express = require('express')
const logger = require('./config/winston.config')
const config = require('config')
// require('express-async-errors')

const app = express()

if (config.get('log.enabled')) require('./startup/logger')(app)
if (config.get('swagger.enabled')) require('./startup/swagger')(app)
require('./startup/routes')(app)
// require('./startup/db')() 

const server = app.listen(config.get('server.port'), () => {
    logger.info(`Server is running on port: ${config.get('server.port')}`)
})

module.exports = server