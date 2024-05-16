require('dotenv').config()
const express = require('express')
const db = require('../db')
const ensureLoggedIn = require('../middlewares/ensure_loggedIn')
const router = express.Router()

router.get(('/server/create'), (req, res)=>{
    console.log('youre trying to edit a file')
    res.render('create')
})

router.get((`/server/:leddit_website`), (req,res) => {
    let serverName = req.params.leddit_website
    serverName = serverName.toLowerCase()
    const sql_getServer = 'SELECT * FROM servers WHERE name = $1;'
    const sql_getContent = `SELECT * FROM content_for_servers WHERE servercode_id = $1;`
    const sql_votes = 'SELECT * FROM votes WHERE server_name = $1'
    const sql_getComments = 'SELECT * FROM comments WHERE server_id = $1;'
    db.query(sql_getServer, [serverName], (err, result) => {
        if (err) console.log(err)
        if (!result.rows[0]) {
            return res.redirect(`/similar_servers/${serverName}`)
        }
        let serverCodeId = result.rows[0].servercode_id
        db.query(sql_getContent, [serverCodeId], (err, contentResults) => {
            if (err) console.log(err)
            db.query(sql_getComments, [serverCodeId], (err, commentResults) => {
                db.query(sql_votes, [serverName], (err, voteResults) => {
                    if (err) console.log(err)
                    console.log('votes', voteResults.rows)
                    res.render('personal_server', {server: result.rows[0], serverContents: contentResults.rows, comments: commentResults.rows, votes: voteResults.rows})
                })
            })

        })
    })
})

router.post('/server/content/:leddit_website/:id', ensureLoggedIn, (req,res) => {
    let serverName = req.params.leddit_website
    let serverId = req.params.id
    let title = req.body.title
    let content = req.body.content
    let imageUrl = req.body.image_url
    let user_name = res.locals.currentUser["username"]
    let user_id = res.locals.currentUser["id"]
    const sql_content = 'INSERT INTO content_for_servers (content, serverCode_id, image_url, user_id, title, user_name) values ($1, $2, $3, $4, $5, $6)'
    db.query(sql_content, [content, serverId, imageUrl, user_id, title, user_name], (err, result) => {
        if (err) console.log(err)
        console.log('Content added successfully to table content_for_server')
        res.redirect(`/server/${serverName}`)
    })
})

router.post('/getSearchValue', (req,res) => {
    if (req.body.search==='') {
        return res.render('home', {errorMessage: "This server does not exist"})
    }
    res.redirect(`/server/${req.body.search}`)
})

router.post('/server/add_to_favourites/:server_name/:server_id', ensureLoggedIn, (req,res) => {
    let user_id = res.locals.currentUser.id
    let server_id = req.params.server_id
    let server_name = req.params.server_name
    sql_favs = 'INSERT INTO favourites (user_id, server_id, server_name) VALUES ($1, $2, $3);'
    db.query(sql_favs, [user_id, server_id, server_name], (err, favResult) => {
        if (err) console.log(err)
        res.redirect(`/server/${server_name}`)
    })
})

module.exports = router