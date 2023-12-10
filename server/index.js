const path = require("path")
const express = require("express")
const { WebSocketServer } = require("ws")

const PORT = process.env.PORT || 3000;

const webSocketServer = new WebSocketServer({ noServer: true })
webSocketServer.on("connection", (ws) => {
  console.log("New client connected");

  ws.send("Connection Established");
  ws.on("close", () => console.log("Client has disconnected"));
  ws.on("message", (data) => {
    webSocketServer.clients.forEach((client) => {
      console.log(`Broadcasted message: ${data}`);
      client.send(data.toString());
    })
  })
  ws.on("error", (error) => console.error(error));
})

const app = express();
app
  .use(express.static(path.resolve(__dirname, "../client")))
  .listen(PORT, console.info(`WebServer listening on port ${PORT}`))
  .on("upgrade", (req, socket, head) => {
    webSocketServer.handleUpgrade(req, socket, head, (ws) => {
      webSocketServer.emit("connection", ws, req)
    })
  })