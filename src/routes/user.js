const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')


router.get('/', userController.getUser)
router.post('/', userController.postUser)
router.put('/', userController.putUser)
router.patch('/', userController.patchUser)
router.delete('/', userController.deleteUser)


module.exports = router