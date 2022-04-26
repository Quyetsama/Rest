const userRouter = require('./User.route')
const studentRouter = require('./Student.route')

const route = app => {

    app.use('/auth', userRouter)
    app.use('/student', studentRouter)

    app.get('/', (req, res, next) => {
        return res.status(200).json({
            success: true
        })
    })

    app.use((req, res, next) => {
        const err = new Error('Not Found')
        err.status = 404
        next(err)
    })
    
    app.use((err, req, res, next) => {
        const status = err.status || 500
        return res.status(status).json({
            error: {
                message: err.message
            }
        })
    })
}

module.exports = route