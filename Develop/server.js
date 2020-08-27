const express = require("express");
const fs = require("fs");
const app = express();

const PORT = 3300
app.use(express.static("public"))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/index.html", function(err){
        if(err) throw err
    })
});

app.get("/notes", function(req, res){
    res.sendFile(__dirname + "/public/notes.html", function(err){
        if(err) throw err
    })
});

app.get("/api/notes", function(req, res){
    fs.readFile(__dirname + "/db/db.json", "utf8", function(err, data){
        if(err) throw err 
        res.json(data)
    })
});

app.listen(PORT, function(){
    console.log("Listening @ PORT 3300")
});


