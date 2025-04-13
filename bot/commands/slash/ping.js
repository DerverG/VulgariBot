module.exports = {
    data: {
        name: 'ping',
        description: 'Responde con Pong!',
    },
    async execute(interaction) {
        await interaction.reply('Pong!')
    }
}