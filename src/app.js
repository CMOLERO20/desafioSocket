import  express  from "express";     
import routerProducts from "./routes/productos.js"; 
import routerLista from "./routes/lista.js";
import handlebars from 'express-handlebars';
import __dirname from './utils.js'
import http from "http";
import {Server} from 'socket.io';
import ProductManager from "./clases/ProductManager.js";  

const productManager = new ProductManager("./src/db/productos.json");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/productos', routerProducts);
app.use('/realtimeproducts', routerLista);

app.use(express.static(__dirname+'/public'));

io.on('connection', async (socket)=>{
    console.log('a user connected');

    socket.emit('productos', await productManager.getProducts())

    socket.on('client:newP', async (newP) => {
        const product = {...newP}
        await productManager.addProduct(product)

        io.emit('productos', await productManager.getProducts())
    })

    socket.on('client:deleteP', async (delIp) =>{
        await productManager.deleteProduct(delIp);
        io.emit('productos', await productManager.getProducts())

    })
})



server.listen(8080, ()=> {
    console.log('servidor corriendo')
})