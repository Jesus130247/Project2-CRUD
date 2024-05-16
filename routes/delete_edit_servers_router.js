require('dotenv').config()
const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/server/:servercode_id/edit', (req,res) => {
    sql = 'SELECT * FROM servers WHERE servercode_id = $1'
    servercode_id = req.params.servercode_id
    db.query(sql, [servercode_id], (err, serverResult) => {
        console.log(serverResult.rows[0])
        res.render('editServer', {server: serverResult.rows[0]})
    })
})

router.put('/server/edit/:servercode_id', (req, res) => {
    let serverName = req.body.server_name
    serverName = serverName.toLowerCase()
    let image = req.body.server_image
    let about = req.body.server_about
    let backgroundColor = req.body.background_color
    let textColor = req.body.text_color
    let serverURL = 'l/'+req.body.server_name
    let code_id = req.params.servercode_id
    const sql_addServer = `
    UPDATE servers SET name = $1, server_url = $2, main_image = $3, about = $4, 
    b_color= $5, text_color= $6 WHERE servercode_id = $7;
    `
    db.query(sql_addServer, [serverName, serverURL, image, about, backgroundColor, textColor, code_id], (err, result) => {
        if (err) console.log(err)
        console.log(`server created ${serverName} @@ ${serverURL}`)
        res.redirect(`/server/${serverName}`)
    })
})

router.get('/server/delete/:servercode_id/:server_name', (req,res) => {
    res.render('deleteServer', {server: req.params.servercode_id, serverName: req.params.server_name})
})

router.delete('/server/:servercode_id/delete', (req,res) => {
    sql_delete = "DELETE FROM servers WHERE servercode_id = $1;"
    db.query(sql_delete, [req.params.servercode_id], (err, result) => {
        if (err) console.log(err)
        res.render('home', {servers: [], errorMessage: 'You have deleted your server'})
    })
})

module.exports = router