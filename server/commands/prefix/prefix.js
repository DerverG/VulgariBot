const { PermissionsBitField } = require('discord.js')
const axiosClient = require('../../api/axiosClient')

module.exports = {
    name: 'prefix',
    //aliases: ['setprefix', 'cambiarprefijo'],
    description: 'Cambia el prefijo del bot',

    run: async(client, message, args, config) => {
        if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.reply('No tienes permisos para usar este comando.')
        if (!args[0]) return message.reply('Debes especificar un nuevo prefijo.')
        if (args[0].length > 3) return message.reply('El prefijo no puede tener más de 3 caracteres.')
        if (args[0] === config.serverPrefix) return message.reply('Ese es el prefijo actual.')
            
        await axiosClient.patch(`/server/updateServerConfig`, {
            serverGuildId: message.guild.id,
            configUpdates: {
                serverPrefix: args[0]
            }
        })

        message.reply(`El prefijo ha sido cambiado a \`${args[0]}\``)
    }
}