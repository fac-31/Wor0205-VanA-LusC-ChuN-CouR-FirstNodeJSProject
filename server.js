// server.js
const express = require('express');
const browserSync = require('browser-sync');
const app = express();
const PORT = process.env.PORT || 3000;
const richardRouter = require('./richardRouter')


// Simple middleware to log request details
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define a route for the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use('/richard', richardRouter);

// Example route for an About page
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/public/about.html');
});

// Anna Page
app.get('/anna', (req, res) => {
  res.sendFile(__dirname + '/public/richard.html');
});

// Christine Page
app.get('/christine', (req, res) => {
  res.sendFile(__dirname + '/public/richard.html');
});

// nick Page
app.get('/nick', (req, res) => {
  res.sendFile(__dirname + '/public/richard.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Initialize BrowserSync
browserSync.init({
  proxy: `http://localhost:${PORT}`,
  files: ['public/**/*.*'], // Watch for changes in the 'public' folder
  reloadDelay: 50,
});
