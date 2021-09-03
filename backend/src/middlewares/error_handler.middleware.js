const debug = require('debug')('middlewares:error')
const HttpStatus = require('http-status-codes')
const winston = require('winston')

module.exports = (err, req, res, next) => {
    // TODO: Log the exception
    debug(err.message)
    winston.error(err.message, err)
    res.status(HttpStatus.BAD_REQUEST).json({ error: { status_code: err.statusCode, message: err.message } })
}