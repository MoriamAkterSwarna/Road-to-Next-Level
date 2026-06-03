import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), './src/database/db.json')

export const readProducts = () => {
    // console.log(process.cwd());
    // console.log(filePath) 

    const products = fs.readFileSync(filePath, 'utf-8')
    // console.log(products.toString())
    // console.log(JSON.parse(products));
    return JSON.parse(products);
}