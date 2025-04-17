const { Events } = require('discord.js')
const axiosClient = require('../api/axiosClient')

module.exports = (client) => {
    client.on(Events.GuildCreate, async (server) => {
        try {
            await axiosClient.post('/server/setup', {
                serverGuildId: server.id,
                serverPrefix: '!', // Default prefix
            })
            console.log(`Server configuration created for ${server.name}, ID: ${server.id}`)
        } catch (err) {
            console.error('Error creating server configuration:', err)
        }
    })
}
