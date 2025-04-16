const axiosClient = require('./axiosClient')

const fetchWelcomeMessage = async (serverGuildId) => {
    try {
        const response = await axiosClient.get(`/welcome/getMessage`, {
            params: { serverGuildId }
        })
        return response.data.message
    } catch (err) {
        console.error('Error fetchin welcome message:', err)
    }
}

module.exports = fetchWelcomeMessage