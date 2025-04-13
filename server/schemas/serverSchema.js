const mongoose = require('mongoose')

const serverSchema = new mongoose.Schema({
    serverGuildId: { type: String, required: true, unique: true },
    serverName: { type: String, required: true },
    serverPrefix: { type: String, required: true, default: '!' },
    modules: {
        vulgarity: {
            enabled: { type: Boolean, required: true, default: true },
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
        welcomeMessage: {
            enabled: { type: Boolean, required: true, default: false },
            welcomeChannelID: { type: String, required: false },
            welcomeMessage: { type: String, required: false },
            welcomeTitle: { type: String, required: false },
            welcomeDescription: { type: String, required: false },
            welcomeColor: { type: String, required: false, default: '#58b9ff' },
            welcomeImage: { type: String, required: false },
        },
        goodbyeMessage: {
            enabled: { type: Boolean, required: true, default: false },
            goodbyeChannelID: { type: String, required: false },
            goodbyeMessage: { type: String, required: false },
            goodbyeTitle: { type: String, required: false },
            goodbyeDescription: { type: String, required: false },
            goodbyeColor: { type: String, required: false, default: '#58b9ff' },
            goodbyeImage: { type: String, required: false },
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
                { keyword: { type: String, required: true }, responseMessage: { type: String, required: true } }
            ]
        },
    },
})

const Server = mongoose.model('Server', serverSchema)

module.exports = Server