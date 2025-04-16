const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responde con Pong!'),
    async execute(interaction, config) {
        await interaction.reply('Pong!')
    }
}