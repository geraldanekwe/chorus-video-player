const express = require('express')
const body_parser = require('body-parser')
const fetch = require('node-fetch');
const path = require('path');

const app = express()
app.use(body_parser.json({}))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/transcripts/:id', (req, res) => {
  const apiURL = 'https://static.chorus.ai/api';
  const { id } = req.params;

  fetch(`${apiURL}/${id}.json`)
    .then(res => res.json())
    .then(json => res.json(json))
    .catch(err => res.json({ error: 'Transcripts not found.' }))
})

app.listen(3000, () => {
  console.log('App listening at http://localhost:3000')
})
