const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require("multer")
const path = require('path');
const { log } = require('console');

exports.storage = new GridFsStorage({
    url: process.env.mongoDBConnectionString,
    file: (req, file) => {
        const fileSize = parseInt(req.headers["content-length"])
        if (fileSize >= 104857600000)
            throw new Error("here")
        return new Promise((resolve, reject) => {
            const filename = path.extname(file.originalname);
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            }
            resolve(fileInfo);
        });
    }
})

exports.upload = multer({
    storage: exports.storage,
})