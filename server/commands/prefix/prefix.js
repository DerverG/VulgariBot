const axiosClient = require('../../config/axiosClient')

module.exports = {
    name: 'prefix',
    //aliases: ['setprefix', 'cambiarprefijo'],
    description: 'Cambia el prefijo del bot',

    run: async(client, message, args, config) => {
        if (!args[0]) return message.reply('Debes especificar un nuevo prefijo.')
        if (args[0].length > 3) return message.reply('El prefijo no puede tener más de 3 caracteres.')
        if (args[0] === config.prefix) return message.reply('Ese es el prefijo actual.')
            
        await axiosClient.patch(`/server/updateServerConfig`, {
            serverGuildId: message.guild.id,
            configUpdates: {
                serverPrefix: args[0]
            }
        })

        message.reply(`El prefijo ha sido cambiado a \`${args[0]}\``)
    }
}