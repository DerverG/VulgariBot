const { Events } = require('discord.js')
const axiosClient = require('../api/axiosClient')

module.exports = (client) => {
    client.on(Events.GuildCreate, async (server) => {
        try {
            await axiosClient.post('/server/setup', {
                serverGuildId: server.guild.id,
                serverPrefix: '!', // Default prefix
            })
            console.log(`Server configuration created for ${server.guid.name}, ID: ${serverGuildId}`)
        } catch (err) {
            console.error('Error creating server configuration:', err)
        }
    })
}
