// server.js
const express = require("express");
const multer = require("multer");
const path = require('path');
//const upload = multer({ dest: "uploads/" });//firsst method
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.post("/upload_files", upload.array("files"), uploadFiles);//first method

function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.files);
    res.json({ message: "Successfully uploaded files" });
}
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
      //  console.log(file)
    }
});

var upload = multer({ storage: storage }).array('files');


app.post('/upload_files', async (req ,res) => {
    
    
    upload(req, res, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log(req.body)
            console.log(req.files)
            //var FileName = req.files.filename;
            //res.status(200).send(FileName);
        }
    })
});
app.get("/download", (req, res) => {
    res.sendFile('85ee1738139d44bcb1828833a9a16ece', { root: path.join(__dirname, '/uploads') });
    //res.sendFile("./uploads/85ee1738139d44bcb1828833a9a16ece")
})
app.listen(5000, () => {
    console.log(`Server started...`);
});