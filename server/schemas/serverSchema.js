const mongoose = require('mongoose')

const serverSchema = new mongoose.Schema({
    serverGuildId: { type: String, required: true, unique: true },
    serverPrefix: { type: String, required: true, default: '!' },
    modules: {
        vulgarity: {
            enabled: { type: Boolean, required: true, default: true },
            allowMentions: { type: Boolean, required: true, default: true },
            disabledChannels: [
                { channelID: { type: String, required: true } }
            ],
            disabledUsers: [
                { userID: { type: String, required: true } }
            ],
            disabledRoles: [
                { roleID: { type: String, required: true } }
            ]
        },
        goodbyeMessage: {
            enabled: { type: Boolean, required: true, default: false },
            channelID: { type: String, required: false },
            meessage: { type: String, required: false },
            messageEmbed: {
                enabled: { type: Boolean, required: true, default: false },
                title: { type: String, required: false },
                description: { type: String, required: false },
                color: { type: String, required: false, default: '#58b9ff' },
                image: { type: String, required: false },
                thumbnailURL: { type: String, required: false },
                footerText: { type: String, required: false },
            },
        },
        logsChannel: {
            enabled: { type: Boolean, required: true, default: false },
            logsChannelID: { type: String, required: false },
            ignoredChannels: [
                { channelID: { type: String, required: true } }
            ]
        },
        autoResponse: {
            enabled: { type: Boolean, default: false },
            responses: [
                {
                    keyword: { type: String, required: true },
                    responseMessage: { type: String, required: true }
                }
            ]
        },
    },
})

const Server = mongoose.model('Server', serverSchema)

module.exports = Server