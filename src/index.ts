import { createServer, IncomingMessage, ServerResponse } from "node:http";
import os from "node:os";

const port = Number(process.env.PORT ?? 3000);

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/health") {
    res.end(JSON.stringify({ status: "healthy" }));
    return;
  }

  // AGREGA ESTO:
  if (req.url === "/info") {
    res.end(
      JSON.stringify({
        app: "container-demo",
        version: "2.0",
        containerized: true,
      })
    );
    return;
  }

  res.end(
    JSON.stringify({
      message: "Hola desde un contenedor",
      hostname: os.hostname(),
      node: process.version,
    })
  );
});

server.listen(port, "0.0.0.0");