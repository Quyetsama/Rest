const mongoose = require('mongoose')
const Schema = mongoose.Schema


const StudentSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        collection: "students"
    }
)


const Student = mongoose.model('Student', StudentSchema)
module.exports = Student