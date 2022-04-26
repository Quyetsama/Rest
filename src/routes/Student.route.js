const express = require('express')
// const router = express.Router()
const router = require('express-promise-router')()
const studentController = require('../controllers/Student.controller')


router.get('/', studentController.authentication, studentController.getAll)
router.post('/', studentController.authentication, studentController.upload, studentController.createStudent)
router.put('/', studentController.authentication, studentController.upload, studentController.updateStudent)
router.patch('/', studentController.authentication, studentController.upload, studentController.updateStudent)
router.delete('/', studentController.authentication, studentController.upload, studentController.deleteStudent)


module.exports = router