const Server = require('../schemas/serverSchema');

const setup = async (req, res) => {
    try {
        const { serverGuildId, serverName, serverPrefix } = req.body

        // Verificar si hay un ID de servidor
        if (!serverGuildId) return res.status(400).json({ message: 'Server ID is required' })

        // Si ya existe un documento, borrar y crear uno nuevo
        const serverExists = await Server.findOne({ serverGuildId })
        if (serverExists) {
            await Server.deleteOne({ serverGuildId })
        }

        // Crear configuracion del servidor
        const config = new Server({ serverGuildId, serverName, serverPrefix })
        await config.save()

        return res.status(200).json({ message: 'Server configuration created', config })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const getServerConfig = async (req, res) => {
    try {
        const { serverGuildId } = req.query

        // Verificar si hay un ID de servidor
        if (!serverGuildId) return res.status(400).json({ message: 'Server ID is required' })

        // Buscar configuracion del servidor
        const config = await Server.findOne({ serverGuildId })

        // Regresar configuracion del servidor
        return res.status(200).json({ message: 'Server configuration', config })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    setup,
    getServerConfig,
}