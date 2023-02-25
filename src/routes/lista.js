import { Router } from "express";   
import ProductManager from "../clases/ProductManager.js";  

const routerLista = Router();
const productManager = new ProductManager("./src/db/productos.json");

routerLista.get('/', async(req,res)=>{
    try {
        let listaProductos = await productManager.getProducts();
         
        let prueba = {productos : listaProductos}
        res.render('realTimeProducts',prueba)
        
    } catch (error) {
        console.log("🚀 ~ file: productos.js:67 ~ routerProducts.get ~ error", error)
        
    }
})

export default routerLista;