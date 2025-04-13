module.exports = {
    name: 'ping',
    description: 'Responde con Pong!',
    run(client, message, args) {
        message.channel.send('Pong!')
    }
}