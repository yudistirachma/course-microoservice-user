const express = require('express');
const router = express.Router();
const usersHandler = require('./handler/users');

// get all user
router.get('/', usersHandler.getUsers)

// get user by id
router.get('/:id', usersHandler.getUser)

// register user 
router.post('/', usersHandler.register)

// user login using jwt
router.post('/login', usersHandler.login)

// user logout
router.post('/logout', usersHandler.logout)

// update user
router.put('/:id', usersHandler.update)

// delete user
router.delete('/:id', usersHandler.destroy)

module.exports = router;
