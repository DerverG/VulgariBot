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
        logsChannel: {
            enabled: { type: Boolean, required: true, default: false },
            logsChannelID: { type: String, required: false },
            ignoredChannels: [
                { channelID: { type: String, required: true } }
            ]
        },
    },
})

const Server = mongoose.model('Server', serverSchema)

module.exports = Server