// connecten met mongodb en welke gegevens worden er naar database verstuurd
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    history: {type: Array},
    cleatedAt: {
        type: String
    }
})
module.exports = mongoose.model('user', UserSchema);