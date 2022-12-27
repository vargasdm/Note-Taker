// need to import fs module
const fs = require('fs')

// need to export uuid package for use in the notes api post request


// need to import express.js
const express = require('express');

// need path for html get routes
const path = require('path');

// need variabel with imported db.json data
const notesData = require('.../db/db.json')

// need a port to host the server
const PORT = process.env.PORT || 3001;

// need variable that holds the express.js function so we can set up the get and post requests
const app = express();

// needed for Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// html get route for the index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);

// html get route for notes.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'notes.html'))
);

// api get route to read the db.json file
app.get('/api/notes', (req, res) => {
    res.json(notesData)
    res.json(`${req.method} request received to get notes`);
    console.info(`${req.method} request received to get notes`);
  });

// api post requestthat should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client with a unique id.
//  can try to use fs.readfile to read db.json with notes, parse that data add the content to an array, strigify data, then use fs.writeFile to add the data (check data persistance activity starting at line 30)
app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request received to add a note`);
    console.info(`${req.method} request received to add a note`);
  });
  
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
