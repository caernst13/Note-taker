const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    console.info(`${req.method} request received`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, './db/db.json')
    }
})

notes.delete('./:note_id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json').then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.id !== noteId);

        writeToFile('./db/db.json', result);
    });
});


module.exports = notes;