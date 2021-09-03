const morgan = require('morgan')
const logger = require('../config/winston.config')

module.exports = (app) => {
    app.use(morgan('combined', { stream: logger.stream }))
}