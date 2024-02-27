const express = require('express');
const path = require('path');
const fs = require("fs")
//const api = require('./routes/index.js');
let database = require("./db/db.json")
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api', api);

app.use(express.static('public'));

//base url: localhost:3001/
// GET Route for landing pages
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

 app.get("/api/notes", (req,res)=>{
    res.json(database)
 })

 app.post("/api/notes", (req,res)=>{
  let newNote = {
    title:req.body.title,
    text:req.body.text,
  }
  database.push(newNote)
  // re write database with newest note
  fs.writeFileSync("./db/db.json", JSON.stringify(database))


    res.json(database)
 })

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
