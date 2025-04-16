const { Events, EmbedBuilder } = require('discord.js')
const fetchServerConfig = require('../api/fetchServerConfig')
const fetchWelcomeMessage = require('../api/fetchWelcomeMessage')

module.exports = (client) => {
    client.on(Events.GuildMemberAdd, async (member) => {
        try {
            const config = await fetchServerConfig(member.guild.id)

            if (!config || !config.modules.welcomeMessage.enabled) return

            // Configuracion desde MongoDB
            // const channelID = config.welcomeMessage?.welcomeMessageChannelID
            // Pruebas
            const channelID = '845574169832063006'

            const channel = member.guild.channels.cache.get(channelID)
            if (!channel) {
                // Hacer que mande una alerta a LOGS
                return
            }

            // Datos del mensaje
            // const welcomeMessage = await fetchWelcomeMessage(member.guild.id)
            const welcomeMessage = {
                message: 'Prueba',
                messageEmbed: {
                    enabled: true,
                    title: 'Title',
                    description: 'Description',
                    color:'#58b9ff',
                    imageURL: 'https://th.bing.com/th/id/OIP.SwnZ7qbGY63-H6uKAAA3SgHaDt?rs=1&pid=ImgDetMain',
                    thumbnailURL: 'ttps://i0.wp.com/brunchvirals.com/wp-content/uploads/2021/03/Image-Of-Examples-Of-Cute-Pfp-For-TikTok.png?w=1300&ssl=1',
                    footerText: 'Footer'
                }
            }

            let embed = null

            if (welcomeMessage.messageEmbed.enabled) {
                embed = new EmbedBuilder()
                    .setTitle(welcomeMessage.messageEmbed.title)
                    .setDescription(welcomeMessage.messageEmbed.description)
                    .setColor(welcomeMessage.messageEmbed.color)
                    .setImage(welcomeMessage.messageEmbed.imageURL)
                    .setThumbnail(welcomeMessage.messageEmbed.thumbnailURL)
                    .setFooter(welcomeMessage.messageEmbed.footerText)
            }


            // Enviar mensaje de bienvenida
            if ( welcomeMessage.message && embed ) {
                channel.send({
                    content: welcomeMessage.message,
                    embeds: [embed],
                })
            } else if (welcomeMessage.message) {
                channel.send(welcomeMessage.message)
            } else if (embed) {
                channel.send({
                    embeds: [embed],
                })
            }
        } catch (err) {
            console.error('Error handling GuildMemberAdd event:', err)
        }
    })
}