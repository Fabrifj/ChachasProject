const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

const fnProduct = require('./product');
const { product } = require('./config');

// CRUD Product
//Get
app.get('/api/product', async(req, res) => {
    const products = await fnProduct.getAllProducts();
    res.send(products);
})

app.post('/api/product', async(req, res) => {
    var newproduct = req.body;
    const response = await fnProduct.createProduct(newproduct);
    res.send(response);
})

app.delete('/api/product/:idproduct', async(req, res) => {
    var productToDelete = req.params.idproduct;
    const response = await fnProduct.deleteProduct(productToDelete);
    res.send(response);
})

app.put('/api/product/:idproduct', async(req, res) => {
    var productToUpdate = req.params.idproduct;
    var body = req.body;
    const response = await fnProduct.updateProduct(productToUpdate, body);
    res.send(response)
})

app.get('/api/product/:idproduct', async (req, res) => {
    var productToGet = req.params.idproduct;
    const response = await fnProduct.getProductById(productToGet);
    res.send(response);
})

app.put('/api/product/:idproduct', async(req, res) => {
    var productToUpdate = req.params.idproduct;
    var body = req.body;
    var quantity = parseInt (body.CantidadInventario, 10)
    const response = await fnProduct.updateProductAfterSale(productToUpdate, quantity);
    res.send(response)
})

app.get('/api/product/subsidiary/:idSub/type/:type', async(req, res) => {
    var idSub = req.params.idSub;
    var type = req.params.type;
    const response = await fnProduct.getProductSubsidiaryType(idSub, type);
    res.send(response)
})

app.listen(
    PORT,
    () => console.log(`Its alive on http://localhost:${PORT}`)
)
