const express = require('express')
const serverController = require('../controllers/serverController')

const router = express.Router()

router.post('/setup', serverController.setup)
router.get('/getServerConfig', serverController.getServerConfig)

module.exports = router