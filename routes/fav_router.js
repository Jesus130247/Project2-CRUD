require('dotenv').config()
const express = require('express')
const db = require('../db')
const router = express.Router()

router.get(('/favourties'), (req,res) => {
    res.render('favourites')
})

router.post('/remove/favourite/:id', (req,res) => {
    id = req.params.id
    sql = "DELETE FROM favourites WHERE id = $1;"
    db.query(sql, [id], (err, result) => {
        if (err) console.log(err)
        return res.redirect('/favourties')
    })
})

module.exports = router