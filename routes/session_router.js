require('dotenv').config()
const express = require('express')
const db = require('../db')
const router = express.Router()


router.get('/login', (req, res) => {
    res.render('login')
})


module.exports = router