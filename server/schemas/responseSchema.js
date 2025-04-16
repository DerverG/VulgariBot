const mongoose = require('mongoose')

const responseSchema = new mongoose.Schema({
    serverGuildId: { type: String, required: true, unique: true },
    enabled: { type: Boolean, required: true, default: false },
    responses: [
        {
            keyword: { type: String, required: true },
            responseMessage: { type: String, required: true }
        }
    ]
})

const Response = mongoose.model('Response', responseSchema)

module.exports = Response