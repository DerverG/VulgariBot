const Server = require('../schemas/serverSchema');

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
    getServerConfig,
}