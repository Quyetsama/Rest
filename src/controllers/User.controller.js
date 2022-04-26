const User = require('../models/User.model')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const JWT = require('jsonwebtoken')



const encodeToken = (userID) => {
    return JWT.sign({
        data: { _id: userID }
    }, process.env.JWT_SECRET, { expiresIn: '1h' })
}
//expiresIn: "20d" // it will be expired after 20 days
//expiresIn: 120 // it will be expired after 120ms
//expiresIn: "120s" // it will be expired after 120s


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

const getUser = async (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: 'GET'
    })
}

const postUser = async (req, res, next) => {
    return res.status(201).json({
        success: true,
        message: 'POST'
    })
}

const putUser = async (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: 'PUT'
    })
}

const patchUser = async (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: 'PATCH'
    })
}

const deleteUser = async (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: 'DELETE'
    })
}

const signUp = async (req, res, next) => {
    const { username, password } = req.body
    // Check email same
    const foundUser = await User.findOne({ username })
    if(foundUser) return res.status(403).json({
        success: false,
        error: 'Tên đăng nhập đã tồn tại'
    })

    // New user
    const newUser = await User.create({ username, password })
    console.log(newUser)

    const token = encodeToken(newUser._id)
    res.setHeader('Authorization', token)

    return res.status(201).json({ success: true, token, newUser })
}

const signIn = async (req, res, next) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    if(!user) {
        return res.status(400).json({
            success: false,
            error: 'Tên đăng nhập hoặc mật khẩu không đúng'
        })
    }

    const isCorrectPassword = await user.isValidPassword(password)

    if(!isCorrectPassword) {
        return res.status(400).json({
            success: false,
            error: 'Tên đăng nhập hoặc mật khẩu không đúng'
        })
    }

    const token = encodeToken(user._id)

    res.setHeader('Authorization', token)
    return res.status(200).json({ success: true, token: token })
}

module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser,
    upload,
    signUp,
    signIn
}