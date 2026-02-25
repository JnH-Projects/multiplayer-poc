import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();

app.use(express.static("public"));

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

// handle websocket connection
const players = new Map();

wss.on("connection", (ws) => {
  let playerId;

  ws.on("message", (msg) => {
    const { player, randomId } = JSON.parse(msg);
    playerId = randomId;

    // Save/update player state
    players.set(randomId, player);

    // Broadcast to everyone else
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "update", player, randomId }));
        console.log(
          `player: ${randomId} - moved to {x: ${player.posX}, y: ${player.posY}}`,
        );
      }
    });
  });

  // When a new player connects, send them all existing players
  ws.on("open", () => {
    players.forEach((player, id) => {
      ws.send(JSON.stringify({ type: "sync", player, randomId: id }));
    });
  });

  ws.on("close", () => {
    players.delete(playerId);
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
