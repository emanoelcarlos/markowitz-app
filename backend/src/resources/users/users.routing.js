const express = require('express')
const router = express.Router()
const users_controller = require('./users.controller')
const auth = require('../../security/auth.middleware')
const authz = require('../../security/authz.middleware')
const validate_object_id = require('../../middlewares/validate_object_id.middleware')
const validate_joi = require('../../middlewares/validate_joi.middleware')
const { validate_user } = require('./users.model')

router.post('/sign_in', validate_joi(validate_user), users_controller.sign_in)
router.get('/', [auth], users_controller.all)
router.get('/:id', [auth, validate_object_id], users_controller.show)
router.post('/', [auth, authz, validate_joi(validate_user)], users_controller.create)
router.patch('/:id', [auth, authz, validate_object_id, validate_joi(validate_user)], users_controller.update)
router.delete('/:id', [auth, authz, validate_object_id], users_controller.delete)

module.exports = router

/**
 * @swagger
 *
 * /users/sign_in:
 *   post:
 *     summary: Authenticate
 *     description: Authenticate a user to be logged in
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserSignInObject'
 *     responses:
 *       200:
 *         description: Is valid request
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *
 */

// GET '/'
/**
 * @swagger
 *
 * /users:
 *   get:
 *     summary: All users
 *     description: Return all users
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: User email
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: User is valid request
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *
 */

// GET '/:id'
/**
 * @swagger
 *
 * /users/{id}:
 *   get:
 *     summary: Show a user
 *     description: Show a user by id
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User is valid request
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *
 */

/**
 * @swagger
 *
 * /users:
 *   post:
 *     summary: Create a user
 *     description: Create a user to be logged in
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserObject'
 *     responses:
 *       200:
 *         description: Is valid request
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *
 */

// PATCH '/:id'
/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update a user
 *     description: Update a user by id
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         description: User id
 *         in: path
 *         required: true
 *         type: string
 *       - name: user
 *         description: User object
 *         in:  body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserObject'
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Remove a user
 *     description:  Remove a user by id
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         description: User id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */

 /**
 * @swagger
 *
 * definitions:
 *   UserObject:
 *     type: object
 *     required:
 *       - full_name
 *       - email
 *       - password
 *       - role
 *       - company
 *     properties:
 *       full_name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       role:
 *         type: string
 *       company:
 *         type: string
 */

 /**
 * @swagger
 *
 * definitions:
 *   UserSignInObject:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */