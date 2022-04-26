const Student = require('../models/Student.model')
const JWT = require('jsonwebtoken')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')


const authentication = (req, res, next) => {
    JWT.verify(req.headers.authorization, process.env.JWT_SECRET, function(err, data) {
        if(err) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized'
            })
        }
        req.user = data.user
        next()
    })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/publics/images')
      },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '.png')
    }
})

const uploadImg = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/png') {
            req.fileValidationError = 'Error';
            return cb(null, false, new Error('goes wrong on the mimetype'));
        }
        cb(null, true);
    }
}).single('image')

const upload = (req, res, next) => {
    uploadImg(req, res, function (err) {
        if(req.fileValidationError) {
            return res.status(400).json({
                success: false,
                message: req.fileValidationError
            })
        }
        next()
    })
}

const getAll = async (req, res, next) => {
    const users = await Student.find()

    return res.status(200).json({
        success: true,
        data: users
    })
}

const createStudent = async (req, res, next) => {

    const { name, age } = req.body
    const { filename } = req.file

    const newStudent = await Student.create(new Student({
        name: name,
        age: age,
        image: filename
    }))

    return res.status(201).json({
        success: true,
        newStudent
    })
}

const updateStudent = async (req, res, next) => {

    const { _id, name, age } = req.body

    const newStudent = await Student.findByIdAndUpdate(
        _id,
        {
            name: name,
            age: age,
            ...( req.file?.filename && { image: req.file?.filename } )
        },
        { new: true }
    )

    return res.status(201).json({
        success: true,
        newStudent
    })
}

const deleteStudent = async (req, res, next) => {

    const { _id } = req.body

    await Student.deleteOne({ _id: _id })

    return res.status(200).json({
        success: true
    })
}

module.exports = {
    authentication,
    getAll,
    upload,
    createStudent,
    updateStudent,
    deleteStudent
}