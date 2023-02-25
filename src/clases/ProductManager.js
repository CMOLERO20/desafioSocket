import fs from 'fs/promises';

class ProductManager{

    constructor(path){

        this.path = path;
        
    }

    async getProducts(){

        try {
            const products = await fs.readFile(this.path);
            return JSON.parse(products)

        } catch (error) {
             console.log("🚀 ~ file: app.js:17 ~ getAllProducts ~ error", error)
             
    }
}

    async getProductById(id){

            try {
                const dbProductos = await this.getProducts();
                const resultado = dbProductos.find(product => product.id == id)
                if(!resultado) return 'Producto no encontrado'
                return resultado
            } catch (error) {
                console.log("🚀 ~ file: app.js:30 ~ ProductManager ~ getProductById ~ error", error)
                
            }
    }

    async generateId(){
        try {
            const dbProductos = await this.getProducts(); 
            if (dbProductos.length === 0) return 1
            return dbProductos[dbProductos.length - 1].id + 1   

        } catch (error) {
            
        }
    }
    async addProduct(newProduct){
        try {
            const dbProductos = await this.getProducts(); 
          
            const newId = await this.generateId();
            newProduct.id = newId ; 
            newProduct.status = true;
            dbProductos.push(newProduct);

            await fs.writeFile(this.path, JSON.stringify(dbProductos));
            return newProduct

        } catch (error) {
            console.log("🚀 ~ file: app.js:68 ~ ProductManager ~ addProduct ~ error", error)
            
        }
    }

    async updateProduct(id,prop,content){

        try {
            const dbProductos = await this.getProducts(); 
            const indexId = dbProductos.findIndex(prod => prod.id == id);
            if(indexId===-1)return 'Producto no encontrado'
            dbProductos[indexId][prop] = content;
            await fs.writeFile(this.path, JSON.stringify(dbProductos));
            return dbProductos[indexId]
        } catch (error) {
            console.log("🚀 ~ file: app.js:82 ~ ProductManager ~ updateProduct ~ error", error)
            
        }
    }

    async deleteProduct(id){
        try {
            const dbProductos = await this.getProducts(); 
            const indexId = dbProductos.findIndex(product => product.id === id);
            dbProductos.splice(indexId,1);
            await fs.writeFile(this.path, JSON.stringify(dbProductos));
           return console.log("Elemento eliminado")
        } catch (error) {
            console.log("🚀 ~ file: app.js:93 ~ ProductManager ~ deleteProduct ~ error", error)
            
        }
    }
}

export default ProductManager;