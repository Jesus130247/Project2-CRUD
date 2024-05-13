require('dotenv').config()
const express = require('express')
const db = require('../db')
const router = express.Router()

router.get(('/edit'), (req, res)=>{
    console.log('youre trying to edit a file')
    res.render('edit')
})
router.get('/delete', (req, res) => {
    console.log('youre trying to delete a file!')
    res.render('delete')
})
router.delete('/deleted', (req,res) => {
    console.log('you deleted a file!')
    res.redirect('/')
})

module.exports = router