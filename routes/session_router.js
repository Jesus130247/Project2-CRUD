require('dotenv').config()
const express = require('express')
const db = require('../db')
const router = express.Router()
const bcrypt = require('bcrypt')
const ensureLoggedIn = require('../middlewares/ensure_loggedIn')
const saltRounds = 10

router.get('/login', (req,res) => {
    res.render('login')
})

router.post('/login', (req,res) => {
    const email = req.body.email
    const plainTextPassword = req.body.password
    const sql = "SELECT * FROM users WHERE email = $1"
    db.query(sql, [email], (err,result) => {
        if (err) console.log(err)
        if (result.rows.length ===0) {
            console.log('user not found')
            return res.render('login', {errorMessage: "Email or Password not found"})
        }
        const hashedPassword = result.rows[0].password_digest
        bcrypt.compare(plainTextPassword, hashedPassword, (err, isCorrect) => {
            if (err) console.log(err)
            if (!isCorrect) {
                console.log('pasword incorrect')
                return res.render('login', {errorMessage: "Email or Password not found"})
            }
            req.session.userId = result.rows[0].id
            res.redirect('/')
        })
    })
})

router.delete('/logout', (req,res) => {
    req.session.userId = null
    res.redirect('/')
})

router.post('/sign_up', (req,res) => {
    const email = req.body.email
    const plainTextPassword = req.body.password
    const username = req.body.text 
    if (email.length < 3 || !email.includes('@') || plainTextPassword === '') {
        return res.render('login', {errorMessage: "Invalid Email or Password"})
    }
    const sql = 'INSERT INTO users (username, email, password_digest) VALUES ($1,$2,$3);'
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(plainTextPassword, salt, (err, hash) => {
            db.query(sql, [username, email, hash], (err,result) => {
                if (err) console.log(err)
                db.query('SELECT * FROM users WHERE email = $1;', [email], (err, results) => {
                    if (err) console.log(err)
                    console.log(results.rows)
                    req.session.userId = results.rows[0].id
                    res.redirect('/')
                })
            })
        })
    })


})

router.delete('/logout', (req,res) => {
    req.session.userId = null
    res.redirect('/')
})


module.exports = router