const { SlashCommandBuilder, PermissionsBitField } = require('discord.js')
const axiosClient = require('../../config/axiosClient')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prefix')
        .setDescription('Cambia el prefijo del bot')
        .addStringOption(option => option
            .setName('nuevo-prefijo')
            .setDescription('El nuevo prefijo del bot')
            .setRequired(true)
            .setMaxLength(3)
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(interaction, config) {
        // Verificar permisos
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content:'No tienes permisos para usar este comando.', ephemeral:true }) 
        // Verificar si no es el mismo
        if (interaction.options.getString('nuevo-prefijo') === config.serverPrefix) return interaction.reply({ content:'Ese es el prefijo actual.', ephemeral:true })
        // Actualizar prefijo
        await axiosClient.patch(`/server/updateServerConfig`, {
            serverGuildId: interaction.guild.id,
            configUpdates: {
                serverPrefix: interaction.options.getString('nuevo-prefijo')
            }
        })
        // Responder
        await interaction.reply({ content:`El prefijo ha sido cambiado a \`${interaction.options.getString('nuevo-prefijo')}\``, ephemeral:true })
    }
}