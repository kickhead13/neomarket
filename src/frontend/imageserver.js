const https = require('https');
const fs = require('fs');
const express = require("express");
const path = require("path");
const multer = require("multer");

const options = {
  key: fs.readFileSync('TLS/cert.key'),
  cert: fs.readFileSync('TLS/cert.crt')
}
const hostname = '192.168.1.128';
const port = 8991;
const app=express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "prod_images");
    },
    filename: function (req, file, cb) {
        cb(null, req.url.split("name=")[1] + ".jpg");
    },
});

var storage_p = multer.diskStorage({
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "pfp");
    },
    filename: function (req, file, cb) {
        cb(null, req.url.split("name=")[1] + ".jpg");
    },
});

const maxSize = 1 * 1000 * 1000;
 
var upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
 
        var extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );
 
        if (mimetype && extname) {
            return cb(null, true);
        }
 
        cb(
            "Error: File upload only supports the " +
                "following filetypes - " +
                filetypes
        );
    },
    // mypic is the name of file attribute
}).single("file");

var upload_p = multer({
    storage: storage_p,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
 
        var extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );
 
        if (mimetype && extname) {
            return cb(null, true);
        }
 
        cb(
            "Error: File upload only supports the " +
                "following filetypes - " +
                filetypes
        );
    },
    // mypic is the name of file attribute
}).single("file");

app.post('/prod', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            // ERROR occurred (here it can be occurred due
            // to uploading image of size greater than
            // 1MB or uploading different file type)
            res.send(err);
        } else {
            // SUCCESS, image successfully uploaded
            res.send("ok");
        }
    });
});

app.post('/prof', (req, res) => {
    upload_p(req, res, function (err) {
        if (err) {
            // ERROR occurred (here it can be occurred due
            // to uploading image of size greater than
            // 1MB or uploading different file type)
            res.send(err);
        } else {
            // SUCCESS, image successfully uploaded
            res.send("ok");
        }
    });
});

https.createServer(options, app).listen(port, () => {
  console.log(`Secure server is running on https://localhost:${port}`);
});