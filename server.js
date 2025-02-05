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

// Catch-all route for undefined paths
app.use((req, res, next) => {
    res.status(404).send(`
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist. Play this game while we redirect you back home!</p>
        <canvas id="gameCanvas" width="400" height="400" style="border:1px solid black;"></canvas>

        <!-- Background Music -->
        <audio id="bgMusic" src="https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3"></audio>

        <script>
            const canvas = document.getElementById('gameCanvas');
            const ctx = canvas.getContext('2d');
            const bgMusic = document.getElementById('bgMusic');
            bgMusic.play().catch(error => console.log('Autoplay blocked:', error));

            let player = { x: 180, y: 350, width: 40, height: 40 };
            let enemy = { x: Math.random() * 360, y: 0, width: 40, height: 40, speed: 5 };
            let gameStarted = false; // FIXED: Added this line

            document.addEventListener('keydown', (event) => {
                if (!gameStarted) {
                    bgMusic.play().catch(error => console.log('Autoplay blocked:', error));
                    gameStarted = true;
                }

                if (event.key === 'ArrowLeft' && player.x > 0) player.x -= 20;
                if (event.key === 'ArrowRight' && player.x < 360) player.x += 20;
            });

            function updateGame() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Draw player
                ctx.fillStyle = '#DE369D';
                ctx.fillRect(player.x, player.y, player.width, player.height);
                
                // Draw enemy
                ctx.fillStyle = '#ff8cc6';
                ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
                
                enemy.y += enemy.speed;
                
                if (enemy.y > 400) {
                    enemy.y = 0;
                    enemy.x = Math.random() * 360;
                }

                // Collision detection
                if (enemy.y + enemy.height > player.y &&
                    enemy.x < player.x + player.width &&
                    enemy.x + enemy.width > player.x) {
                    alert('Game Over! Redirecting...');
                    window.location.href = "/";
                } else {
                    requestAnimationFrame(updateGame);
                }
            }

            updateGame();

            setTimeout(() => {
                alert('Time’s up! Redirecting...');
                window.location.href = "/";
            }, 10000); // Redirects after 10 seconds
        </script>
    `);
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
