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
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, body } = req.body;

  // If all the required properties are present
  if (title && body) {
    // Variable for the object we will save
    const newNote = {
      title,
      body,
      note_id: uuid(),
    };

    // Obtain existing notes
    fs.readFile('.../db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new note
        parsedNotes.push(newNote);

        // Write updated notess back to the file
        fs.writeFile(
          '.../db/db.json',
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
  
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
