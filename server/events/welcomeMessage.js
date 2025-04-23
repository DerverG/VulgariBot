const { Events, EmbedBuilder } = require('discord.js')
const fetchServerConfig = require('../api/fetchServerConfig')
const fetchWelcomeMessage = require('../api/fetchWelcomeMessage')

module.exports = (client) => {
    client.on(Events.GuildMemberAdd, async (member) => {
        try {
            let embed = null
            const config = await fetchServerConfig(member.guild.id)

            if (!config || !config.modules.welcomeMessage.enabled) return

            const channel = member.guild.channels.cache.get(config.modules.welcomeMessage?.welcomeMessageChannelID)
            if (!channel) {
                // Hacer que mande una alerta a LOGS
                console.log(`Canal no encontrado, server: ${member.guild.id}`)
                return
            }

            // Datos del mensaje
            const welcomeMessage = await fetchWelcomeMessage(member.guild.id)

            if (welcomeMessage.messageEmbed.enabled) {
                embed = new EmbedBuilder()
                    .setTitle(welcomeMessage.messageEmbed.title || null)
                    .setDescription(welcomeMessage.messageEmbed.description || null)
                    .setColor(welcomeMessage.messageEmbed.color) // Por defecto es `#58b9ff`
                    .setImage(welcomeMessage.messageEmbed.imageURL || null)
                    .setThumbnail(welcomeMessage.messageEmbed.thumbnailURL || null)
                    .setFooter({ text: welcomeMessage.messageEmbed.footerText || null })
            }

            // Enviar mensaje de bienvenida
            if (welcomeMessage.message && embed) {
                await channel.send({
                    content: welcomeMessage.message,
                    embeds: [embed],
                })
            } else if (welcomeMessage.message) {
                await channel.send(welcomeMessage.message)
            } else if (embed) {
                await channel.send({
                    embeds: [embed],
                })
            }
        } catch (err) {
            console.error('Error handling GuildMemberAdd event:', err)
        }
    })
}