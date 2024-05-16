require('dotenv').config()
const express = require('express')
const db = require('../db')
const router = express.Router()


router.get('/', (req, res) => {
    db.query('SELECT * FROM servers;', (err, result) => {
        if (err) console.log(err)
        let servers = []
        if (result.rows.length < 5) {
            for (let server of result.rows) {
                servers.push(server)
            }
        } else {
            for (let i=0; i<5; i++) {
                servers.push(result.rows[i])
            }
        }
        console.log(servers)
        res.render('home', {servers})
    })
})

router.get('/about', (req, res) => {
    res.render('about')
})

router.get('/similar_servers/:input', (req,res) => {
    let input = req.params.input;
    let trimmedInput = input.trim().toLowerCase();
    console.log(trimmedInput)
    sql = `SELECT * FROM servers WHERE name LIKE $1;`
    db.query(sql, [`%${trimmedInput}%`], (err, likeResult) => {
        if (likeResult.rows.length === 0) {
            return res.render('similar_servers', {similar_servers: [], errorMessage: 'This server does not exist'})
        } else {
            return res.render('similar_servers', {similar_servers: likeResult.rows})
        }
    })
})

router.post('/getSearchValue', (req,res) => {
    if (req.body.search==='') {
        db.query('SELECT * FROM servers;', (err, result) => {
            if (err) console.log(err)
            let servers = []
            if (result.rows.length < 5) {
                for (let server of result.rows) {
                    servers.push(server)
                }
            } else {
                for (let i=0; i<5; i++) {
                    servers.push(result.rows[i])
                }
            }
            console.log(servers)
            return res.render('home', {servers, errorMessage: "This server does not exist"})
        })
} else {
    return res.redirect(`/server/${req.body.search}`)
}
})

module.exports = router