require('dotenv').config()
const express = require('express')
const db = require('../db')
const router = express.Router()

router.delete('/server/:leddit_server/content/:content_id', (req,res) => {
    const serverName = req.params.leddit_server
    const sql_delete = "DELETE FROM content_for_servers WHERE id = $1;"
    db.query(sql_delete, [req.params.content_id], (err, result) => {
        if (err) {console.log(err)}
        console.log(`content deleted seccessfully from ${serverName}`)
        res.redirect(`/server/${serverName}`)
    })
})

router.delete('/server/:leddit_server/comment/:content_id', (req,res) => {
    const serverName = req.params.leddit_server
    const sql_delete = "DELETE FROM comments WHERE id = $1;"
    db.query(sql_delete, [req.params.content_id], (err, result) => {
        if (err) {console.log(err)}
        console.log(`comment deleted seccessfully from ${serverName}`)
        res.redirect(`/server/${serverName}`)
    })
})

router.post('/server/:leddit_server/:leddit_server_id/content/:content_id/comment', (req, res) => {
    const serverName = req.params.leddit_server
    let comment = req.body.comment
    if (comment==='') {
        return res.redirect(`/server/${serverName}`)
    }
    let server_id = req.params.leddit_server_id
    let post_id = req.params.content_id
    console.log(res.locals.currentUser)
    currentUser = res.locals.currentUser["id"]
    const sql_comment = "INSERT INTO comments (content, user_id, server_id, post_id) VALUES ($1, $2, $3, $4);"
    db.query(sql_comment, [comment, currentUser, server_id, post_id], (err, result) => {
        if (err) console.log(err)
        console.log("you have successfully commented")
        res.redirect(`/server/${serverName}`)
    })
})

router.post(('/server/create/set_up'), (req, res) => {
    let serverName = req.body.server_name
    serverName = serverName.toLowerCase()
    let image = req.body.server_image
    let about = req.body.server_about
    let backgroundColor = req.body.background_color
    let textColor = req.body.text_color
    if (serverName==='') {
        return res.render('create', {errorMessage: "cannot create blank server"})
    }
    let serverURL = 'l/'+req.body.server_name
    const sql_addServer = 'INSERT INTO servers (name, server_url, main_image, about, b_color, text_color) values ($1, $2, $3, $4, $5, $6);'
    db.query(sql_addServer, [serverName, serverURL, image, about, backgroundColor, textColor], (err, result) => {
        if (err) console.log(err)
        console.log(`server created ${serverName} @@ ${serverURL}`)
        res.redirect('/server/create')
    })
})

module.exports = router