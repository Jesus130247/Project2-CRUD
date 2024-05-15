const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2
const cloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const upload = multer ({
    storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        parmas: {
            folder: "cloud_demo"
        }
    })
})

module.exports = upload