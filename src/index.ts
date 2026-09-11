import { createServer, IncomingMessage, ServerResponse } from "node:http";
import os from "node:os";

const port = Number(process.env.PORT ?? 3000);

const openApiSpec = JSON.stringify({
  openapi: "3.0.0",
  info: {
    title: "Container Demo API",
    version: "3.0.0",
    description: "API de demostración para la práctica de contenedores",
  },
  paths: {
    "/": {
      get: {
        summary: "Endpoint raíz",
        responses: { "200": { description: "Mensaje de saludo" } },
      },
    },
    "/health": {
      get: {
        summary: "Health check",
        responses: { "200": { description: "Estado de la aplicación" } },
      },
    },
    "/info": {
      get: {
        summary: "Información de la app",
        responses: { "200": { description: "Versión y detalles" } },
      },
    },
  },
});

const swaggerHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css">
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    SwaggerUIBundle({ url: "/api-docs", dom_id: '#swagger-ui' })
  </script>
</body>
</html>`;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/health") {
    res.end(JSON.stringify({ status: "healthy" }));
    return;
  }

  if (req.url === "/info") {
    res.end(
      JSON.stringify({
        app: "container-demo",
        version: "3.0",
        containerized: true,
      })
    );
    return;
  }

  if (req.url === "/api-docs") {
    res.end(openApiSpec);
    return;
  }

  if (req.url === "/docs") {
    res.setHeader("Content-Type", "text/html");
    res.end(swaggerHtml);
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