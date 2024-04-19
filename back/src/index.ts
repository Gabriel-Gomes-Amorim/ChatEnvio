import express from "express";
import http from "http";
import cors from "cors";
import router from "./routes";
import * as WebSocket from "ws";

const app = express();
export const server = http.createServer(app);

export const wss = new WebSocket.Server({ server });

export const broadcast = (msg: any) => {
  console.log("Broadcasting message:", msg);

  wss.clients.forEach((client) => {
    client.send(JSON.stringify(msg));
  });
};

wss.on("connection", (ws) => {
  const heartbeat = () => {
    if (!ws) return;
    if (ws.readyState !== 1) return;
    ws.send(
      JSON.stringify({
        type: "heartbeat",
        msg: true,
      })
    );
    setTimeout(heartbeat, 20000);
  };
  heartbeat();
});

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(router);

server.listen(process.env.API_PORT, () => {
  console.log("server started successfully  :)");
});
