require('dotenv').config()
const upload = require('../middlewares/upload.js')

app.post('/upload', upload.single('upload_file'), (req,res) => {
    //console.log file info
    //upload middleware will define a req.file for you
    console.log(req.file)
    console.log(req.file.path) //want to save into resources table as image_url
    //redirect
    res.redirect('/')
})