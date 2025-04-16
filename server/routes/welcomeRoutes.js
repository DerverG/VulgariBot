const express = require('express')
const welcomeController = require('../controllers/welcomeController')

const router = express.Router()

// rutas
router.get('/getWelcomeMessage', welcomeController.getWelcomeMessage)
router.post('/addWelcomeMessage', welcomeController.addWelcomeMessage)
router.patch('/updateWelcomeMessage', welcomeController.updateWelcomeMessage)

module.exports = router