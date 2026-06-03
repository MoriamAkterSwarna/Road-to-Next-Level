import  { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/products.controller";


export const routeHandlers=((req: IncomingMessage, res: ServerResponse) => {
    // console.log(req.url);  // '/', '/user', '/products'
  // console.log(req.method); // 'GET' , "POST" , "DELETE"

  const url = req.url;
  const method = req.method;

  if (url === "/" && method == "GET") {
    // console.log("This is root route")
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This is root route" }));
  } else if (url?.startsWith("/products")) {
    // res.writeHead(200, { "content-type": "application/json" });
    // res.end(JSON.stringify({ message: "This is Products route" }));

    productController(req, res); 
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end(JSON.stringify({ message: "Route not Found" }));
  }
});