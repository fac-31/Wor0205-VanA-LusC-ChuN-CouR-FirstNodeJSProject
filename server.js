// server.js
const express = require('express');
const browserSync = require('browser-sync');
const app = express();
const PORT = process.env.PORT || 3000;

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

// Example route for an About page
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/public/about.html');
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
