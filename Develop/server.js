const express = require("express");
const fs = require("fs");
const app = express();

const PORT = 3300
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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
        res.json(JSON.parse(data))
    })
});

app.get("/api/notes/:id", function(req, res){
    console.log(req.params.id)
    fs.readFile(__dirname + "/db/db.json", "utf8", function(err, data){
        if(err) throw err 
        var dataParse = JSON.parse(data)
        for (var i = 0; i < dataParse.length; i++) {
            if (req.params.id == dataParse[i].id) {
                return res.json(dataParse[i]);
            }
        }
    })
});

// LOAD N
app.post("/api/notes", function(req, res){
    fs.readFile(__dirname + "/db/db.json", "utf8", function(err, data){
        if(err) throw err
        // console.log(data)
        console.log(req.body)
        const userInput = JSON.parse(data)
        req.body.id = userInput.length + 1
        userInput.push(req.body)
        console.log(userInput)
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(userInput), function(err) {
        if (err) throw err
        })
    })
});

app.delete("/api/notes/:trash", function(req, res){
    fs.readFile(__dirname + "/db/db.json", "utf8", function(err, data){
        if(err) throw err
        const userInput = JSON.parse(data)
        console.log("hello")
        userInput.splice(parseInt(req.params.trash) - 1, 1)
        console.log(userInput)
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(userInput), function(err) {
        if (err) throw err
        })
    })
});

app.listen(PORT, function(){
    console.log("Listening @ PORT 3300")
});
