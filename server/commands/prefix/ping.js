module.exports = {
    name: 'ping',
    description: 'Responde con Pong!',
    run(client, message, args, config) {
        message.channel.send('Pong!')
    }
}