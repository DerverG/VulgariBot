const mongoose = require('mongoose')

const goodbyeSchema = new mongoose.Schema({
    serverGuildId: { type: String, required: true, unique: true },
    enabled: { type: Boolean, required: true, default: false },
    channelID: { type: String, required: true },
    message: { type: String, required: false },
    messageEmbed: {
        enabled: { type: Boolean, required: true, default: false },
        title: { type: String, required: false },
        description: { type: String, required: false },
        color: { type: String, required: false, default: '#58b9ff' },
        imageURL: { type: String, required: false },
        thumbnailURL: { type: String, required: false },
        footerText: { type: String, required: false },
    }
})

const Goodbye = mongoose.model('Goodbye', goodbyeSchema)

module.exports =  Goodbye