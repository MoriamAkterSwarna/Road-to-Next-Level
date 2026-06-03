import { createServer, IncomingMessage, Server } from "http";
import { routeHandlers } from "./Routes/route";

const server: Server = createServer((req: IncomingMessage, res) => {
  routeHandlers(req, res); 
});

server.listen(5000, () => {
  console.log("server is running on port 5000");
});
