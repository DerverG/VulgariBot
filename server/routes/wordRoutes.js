const express = require('express')
const wordController = require('../controllers/wordController')

const router = express.Router()

router.get('/getWord', wordController.getWord)
router.post('/addWord', wordController.addWord)
router.delete('/deleteWord/:id', wordController.deleteWord)

module.exports = router