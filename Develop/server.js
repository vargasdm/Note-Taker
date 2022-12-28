// need to import fs module
const fs = require('fs')

// need to export uuid package for use in the notes api post request
const { v4: uuid } = require('uuid');

// need to import express.js
const express = require('express');

// need path for html get routes
const path = require('path');

// need a port to host the server on heroku
const PORT = process.env.PORT || 3002;

// need variable that holds the express.js function so we can set up the get and post requests
const app = express();

// needed for Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// html get route for notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
}
);

// api get route to read the db.json file
app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received to get notes`);
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.send(data)
    }
  })
});

// api post requestthat should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client with a unique id.
//  can try to use fs.readfile to read db.json with notes, parse that data add the content to an array, strigify data, then use fs.writeFile to add the data (check data persistance activity starting at line 30)
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    // Obtain existing notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new note
        parsedNotes.push(newNote);

        // Write updated notess back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});

// html get route for the index.html
app.get('*', (req, res) => {
  console.log("home")
  res.sendFile(path.join(__dirname, 'public/index.html'))
}
);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
