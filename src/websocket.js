const WebSocket = require('ws');
const pool = require('./database');

function startWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', async (ws) => {
    console.log('Client connected.');

    // Send the number of stories in the last 5 minutes
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      `SELECT COUNT(*) AS count FROM stories WHERE timestamp >= NOW() - INTERVAL 5 MINUTE`
    );
    connection.release();

    ws.send(JSON.stringify({ message: 'Stories in last 5 minutes', count: rows[0].count }));

    // Periodically send new stories
    setInterval(async () => {
      const connection = await pool.getConnection();
      const [newStories] = await connection.query(
        `SELECT * FROM stories WHERE timestamp >= NOW() - INTERVAL 1 MINUTE`
      );
      connection.release();

      if (newStories.length > 0) {
        ws.send(JSON.stringify({ message: 'New stories', stories: newStories }));
      }
    }, 60000); // Every 1 minute
  });
}

module.exports = startWebSocketServer;
