import type { IncomingMessage, ServerResponse } from "http";
import { readProducts } from "../services/product.service";
import type { IProduct } from "../types/product.types";

export const productController = ((req: IncomingMessage, res:ServerResponse) => {
    const url = req.url;
  const method = req.method;


//   GET single Product

const urlParts = url?.split('/');

const id = urlParts && urlParts[1] ? Number(urlParts[2]) : null; 

// console.log(urlParts, id)  







//   const products = [
//     {
//         "id" : 1, 
//         "productName" : "Headphone",
//         "price": 2500
//     }
//   ]


// GET All Products
  const products = readProducts()

  if (url === "/products" &&  method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Products Retrieved successfully" , data: products}));
  } else if( method === "GET" && id !== null) {

    // GET Single Product 
     const products = readProducts()

     const singleProduct = products.find((p : IProduct) => p.id === id)

     console.log(singleProduct)


    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Product Retrieved successfully" , data: singleProduct}));
  }
})