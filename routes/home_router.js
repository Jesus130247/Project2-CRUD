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

router.get('/similar_servers/:input', (req,res) => {
    let input = req.params.input;
    let trimmedInput = input.trim().toLowerCase();
    console.log(trimmedInput)
    sql = `SELECT * FROM servers WHERE name LIKE '%${trimmedInput}%';`
    db.query(sql, (err, likeResult) => {
        console.log(likeResult.rows)
        res.render('similar_servers', {similar_servers: likeResult.rows})
    })
})

module.exports = router