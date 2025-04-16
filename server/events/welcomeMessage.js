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
            // message = await fetchWelcomeMessage(member.guild.id)
            

            const embed = new EmbedBuilder()
                .setTitle('Title')
                .setDescription('Description')
                .setColor('#58b9ff')
                .setImage('https://th.bing.com/th/id/OIP.SwnZ7qbGY63-H6uKAAA3SgHaDt?rs=1&pid=ImgDetMain')
                .setThumbnail('https://i0.wp.com/brunchvirals.com/wp-content/uploads/2021/03/Image-Of-Examples-Of-Cute-Pfp-For-TikTok.png?w=1300&ssl=1')
                .setFooter('Footer')


            // Enviar mensaje de bienvenida
            channel.send({ embeds: [embed] })
        } catch (err) {
            console.error('Error handling GuildMemberAdd event:', err)
        }
    })
}