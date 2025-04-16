const { Events } = require('discord.js')
const axiosClient = require('../api/axiosClient')
const fetchServerConfig = require('../api/fetchServerConfig')

module.exports = (client) => {
    client.on(Events.GuildMemberAdd, async (member) => {
        const config = await fetchServerConfig(member.guild.id)
        if (!config) return

        if (!config.modules.welcomeMessage.enabled) return

        const channelID = config.modules.welcomeMessage.welcomeMessageChannelID

        const message = member.guild.channels.cache.get(channelID)
        if (!message) return

        message.send(`¡Bienvenido ${member.user.username} a ${member.guild.name}!`)

    })
}