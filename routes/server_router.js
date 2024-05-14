require('dotenv').config()
const express = require('express')
const db = require('../db')
const router = express.Router()

router.get(('/server/create'), (req, res)=>{
    console.log('youre trying to edit a file')
    res.render('create')
})
router.get('/server/delete', (req, res) => {
    console.log('youre trying to delete a file!')
    res.render('delete')
})
router.delete('/server/deleted', (req,res) => {
    console.log('you deleted a file!')
    res.redirect('/')
})
router.get(('/server/favourties'), (req,res) => {
    res.render('favourites')
})

module.exports = router