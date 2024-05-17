require('dotenv').config()
const express = require('express')
const db = require('../db')
const router = express.Router()

router.delete('/server/:leddit_server/content/:content_id', (req,res) => {
    const serverName = req.params.leddit_server
    const sql_delete = "DELETE FROM content_for_servers WHERE content_id = $1;"
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
    let serverName = req.body.server_name.substring(req.body.server_name.indexOf('/')+1)
    serverName = serverName.toLowerCase()
    console.log(serverName)
    let image = req.body.server_image
    let about = req.body.server_about
    let backgroundColor = req.body.background_color
    let textColor = req.body.text_color
    let userID = res.locals.currentUser.id
    const sql_search = 'SELECT name FROM servers WHERE name = $1;'
    db.query(sql_search, [serverName], (err, searchRes) => {
        if (err) console.log(err)
        if (searchRes.rows.length > 0) {
            return res.render('create', {errorMessage: "Cannot create repeating server"})
        }
        if (serverName==='') {
            return res.render('create', {errorMessage: "Cannot create blank server"})
        } else {
            let serverURL = 'l/'+serverName
            const sql_addServer = 'INSERT INTO servers (name, users_id ,server_url, main_image, about, b_color, text_color) values ($1, $2, $3, $4, $5, $6, $7);'
            db.query(sql_addServer, [serverName, userID, serverURL, image, about, backgroundColor, textColor], (err, result) => {
                if (err) console.log(err)
                console.log(`server created ${serverName} @@ ${serverURL}`)
                res.redirect(`/server/${serverName}`)
            })
        }
    })
})


router.put('/post/upvote/:content_id/:serverName', (req,res) => {
    const contentId = req.params.content_id
    const serverName = req.params.serverName
    const whoVoted = res.locals.currentUser.id
    const sql_check = `SELECT * FROM votes WHERE contents_id = $1 AND who_voted = $2;`
    const sql_vote = 'INSERT INTO votes (vote, who_voted, contents_id, server_name) VALUES ($1, $2, $3, $4);'
    db.query(sql_check, [contentId, whoVoted], (err, checkResults) => {
        if (err) console.log(err)
        console.log('length', checkResults.rows.length)
        if (checkResults.rows.length > 0) {
            const sql_delete = `DELETE FROM votes WHERE contents_id = $1 AND who_voted = $2;`
            db.query(sql_delete, [contentId, whoVoted], (err, deleteResults) => {
                if (err) console.log(err)
                db.query(sql_vote, [1, whoVoted, contentId, serverName], (err, addResult) => {
                    if (err) console.log(err)
                    return res.redirect(`/server/${serverName}`)
                })
            })
        } else {
            db.query(sql_vote, [1, whoVoted, contentId, serverName], (err, addResult) => {
                if (err) console.log(err)
                return res.redirect(`/server/${serverName}`)
            })
        }
    })
})
router.put('/post/downvote/:content_id/:serverName', (req,res) => {
    const contentId = req.params.content_id
    const serverName = req.params.serverName
    const whoVoted = res.locals.currentUser.id
    const sql_check = `SELECT * FROM votes WHERE contents_id = $1 AND who_voted = $2;`
    const sql_vote = 'INSERT INTO votes (vote, who_voted, contents_id, server_name) VALUES ($1, $2, $3, $4);'
    db.query(sql_check, [contentId, whoVoted], (err, checkResults) => {
        if (err) console.log(err)
        console.log('length', checkResults.rows.length)
        if (checkResults.rows.length > 0) {
            console.log("sql check done")
            const sql_delete = `DELETE FROM votes WHERE contents_id = $1 AND who_voted = $2;`
            db.query(sql_delete, [contentId, whoVoted], (err, deleteResults) => {
                if (err) console.log(err)
                console.log("sql delete area")
                db.query(sql_vote, [-1, whoVoted, contentId, serverName], (err, addResult) => {
                    if (err) console.log(err)
                    return res.redirect(`/server/${serverName}`)
                })
            })
        } else {
            db.query(sql_vote, [-1, whoVoted, contentId, serverName], (err, addResult) => {
                if (err) console.log(err)
                console.log('eql check skipped')
                return res.redirect(`/server/${serverName}`)
            })
        }
    })
})
module.exports = router