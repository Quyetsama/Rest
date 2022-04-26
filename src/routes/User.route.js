const express = require('express')
const router = express.Router()
const userController = require('../controllers/User.controller')


router.get('/', userController.getUser)
router.post('/', userController.postUser)
router.put('/', userController.putUser)
router.patch('/', userController.patchUser)
router.delete('/', userController.deleteUser)

router.post('/uploads', userController.upload, (req, res, next) => {
    return res.status(201).json({
        image: req.file.filename,
        data: req.body
    })
})


router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)


module.exports = router