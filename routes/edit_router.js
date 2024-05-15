require('dotenv').config()
const express = require('express')
const db = require('../db')
const router = express.Router()

router.delete('/server/:leddit_server/content/:content_id', (req,res) => {
    const serverName = req.params.leddit_server
    sql_delete = "DELETE FROM content_for_servers WHERE id = $1;"
    db.query(sql_delete, [req.params.content_id], (err, result) => {
        if (err) {console.log(err)}
        console.log(`content deleted seccessfully from ${serverName}`)
        res.redirect(`/server/${serverName}`)
    })
})

module.exports = router