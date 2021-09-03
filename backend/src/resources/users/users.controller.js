const debug = require('debug')('controller:users')
const _ = require('lodash')
const HttpStatus = require('http-status-codes') 
const users_service = require('./users.service')
// const tokenList = {}

exports.sign_in = async (req, res) => {
    let user = await users_service.find_by_email(req.body.email)
    if (!user) return res.status(HttpStatus.BAD_REQUEST).send({message:'Invalid email'})

    const valid_password = await user.passwordMatches(req.body.password)
    if (!valid_password) return res.status(HttpStatus.BAD_REQUEST).send({message:'Invalid password'})

    const token = user.generateUserToken()
    // const refreshToken = user.generateUserRefreshToken()

    const response = { _id: user._id, name: user.name, email: user.email, role: user.role, accessToken: token }

    // tokenList[refreshToken] = response

    res.send(response)
}

exports.all = async (req, res) => {
    const email = req.query.email ? req.query.email : null
    const users = await users_service.get_users(email)
    res.json(users)
}

exports.show = async (req, res) => {
    const user = await users_service.get_user(req.params.id)
    if (!user) return res.status(HttpStatus.NOT_FOUND).send({message:'Invalid user'})

    res.json(user)
}

exports.create = async (req, res) => {
    let user = await users_service.find_by_email(req.body.email)
    if (user) return res.status(HttpStatus.BAD_REQUEST).send({message:'User already registered.'})   

    user = await users_service.create_user(req.body)

    res.status(HttpStatus.CREATED).json(_.pick(user, ['_id', 'name', 'email', 'role']))
}

exports.update = async (req, res) => {
    let user = await users_service.find_by_id(req.params.id)
    if (!user) return res.status(HttpStatus.NOT_FOUND).send({message:'Invalid user'})

    user = await users_service.update_user(req.params.id, req.body)

    res.json(_.pick(user, ['_id', 'name', 'email', 'role']))
}

exports.delete = async (req, res) => {
    const user = await users_service.find_by_id(req.params.id)
    if (!user) res.status(HttpStatus.BAD_REQUEST).send({ message: 'Invalid user' })

    await user.remove()

    res.json({ message: 'Delete successfully' })
}