const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

const fnProduct = require('./product');

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

app.put('/api/product:idproduct', async(req, res) => {
    var productToUpdate = req.params.idproduct;
    var body = req.body;
    const response = await fnProduct.updateProduct(productToUpdate, body);
    res.send(response)
})

app.listen(
    PORT,
    () => console.log(`Its alive on http://localhost:${PORT}`)
)