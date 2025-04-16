const axios = require('axios')
require('dotenv').config()

const axiosClient = axios.create({
    // Localhost
    baseURL: `${process.env.SERVER_LINK}${process.env.SERVER_PORT}/api/`,
    headers: {
        'Content-Type': 'application/json',
    }
})

module.exports = axiosClient