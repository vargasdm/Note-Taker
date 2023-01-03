const fs = require('fs')

// package that creates random id
const { v4: uuid } = require('uuid');

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// html GET route for notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
}
);

// api GET route to read the db.json file
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

// api POST request reads the db.json file, adds the new note, and appends it
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);
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

// html GET route for the index.html
app.get('*', (req, res) => {
  console.log("home")
  res.sendFile(path.join(__dirname, 'public/index.html'))
}
);

// runs the server
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));