
// server/app.js
const express = require('express');
const path = require('path');

const app = express();

// Serve static assets
app.use('/static', express.static(path.resolve(__dirname, '..', 'build/static')));
app.use('/icons', express.static(path.resolve(__dirname, '..', 'build')));
// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app