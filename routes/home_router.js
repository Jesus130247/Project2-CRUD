require('dotenv').config()
const express = require('express')
const db = require('../db')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('home')
})

router.get('/about', (req, res) => {
    res.render('about')
})


module.exports = router