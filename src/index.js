const http = require('http');
const startWebSocketServer = require('./websocket');
const startCronJob = require('./cron');
const fetchTopStories = require('./scraper');

// HTTP server setup
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hacker News Scraper is running');
});

// Start WebSocket server
startWebSocketServer(server);

// Start cron job for periodic scraping
startCronJob();

// Initial scrape on server start
fetchTopStories();

// Start HTTP server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
