const mongoose = require('mongoose')

const userSchama = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    isFriendly: {
        type: Boolean,
        required: true,
        default: false
    }
})


module.exports = mongoose.model('User', userSchama)