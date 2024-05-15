require('dotenv').config()
const express = require('express')
const db = require('../db')
const router = express.Router()

router.get(('/server/create'), (req, res)=>{
    console.log('youre trying to edit a file')
    res.render('create')
})

router.post(('/server/create/set_up'), (req, res) => {
    let serverName = req.body.server_name
    serverName = serverName.toLowerCase()
    if (serverName==='') {
        return res.render('create', {errorMessage: "cannot create blank server"})
    }
    let serverURL = 'l/'+req.body.server_name
    const sql_addServer = 'INSERT INTO servers (name, server_url) values ($1, $2);'
    db.query(sql_addServer, [serverName, serverURL], (err, result) => {
        if (err) console.log(err)
        console.log(`server created ${serverName} @@ ${serverURL}`)
        res.redirect('/server/create')
    })
})

router.get((`/server/:leddit_website`), (req,res) => {
    let serverName = req.params.leddit_website
    serverName = serverName.toLowerCase()
    const sql_getServer = 'SELECT * FROM servers WHERE name = $1'
    const sql_getContent = 'SELECT * FROM content_for_servers WHERE servercode_id = $1'
    db.query(sql_getServer, [serverName], (err, result) => {
        if (err) console.log(err)
        if (!result.rows[0]) {
            return res.render('home', {errorMessage: "This server does not exist"})
        }
        let serverCodeId = result.rows[0].servercode_id
        db.query(sql_getContent, [serverCodeId], (err, results) => {
            if (err) console.log(err)
            console.log(results.rows)
            res.render('personal_server', {server: result.rows[0], serverContents: results.rows})
        })
    })
})

router.post('/server/content/:leddit_website/:id', (req,res) => {
    let serverName = req.params.leddit_website
    let serverId = req.params.id
    let title = req.body.title
    let content = req.body.content
    let imageUrl = req.body.image_url
    let user_name = res.locals.currentUser["username"]
    const sql_content = 'INSERT INTO content_for_servers (content, serverCode_id, image_url, user_id, title) values ($1, $2, $3, $4, $5)'
    db.query(sql_content, [content, serverId, imageUrl, user_name, title], (err, result) => {
        if (err) console.log(err)
        console.log('Content added successfully to table content_for_server')
        res.redirect(`/server/${serverName}`)
    })
})


router.get(('/server/favourties'), (req,res) => {
    res.render('favourites')
})


router.post('/getSearchValue', (req,res) => {
    if (req.body.search==='') {
        return res.render('home', {errorMessage: "This server does not exist"})
    }
    res.redirect(`/server/${req.body.search}`)
})

module.exports = router