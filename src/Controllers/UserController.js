

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

module.exports = { 
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}