const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

const fnOrder = require('./order');

// CRUD Order
//Get
app.get('/api/order', async(req, res) => {
    const orders = await fnOrder.getAllOrders();
    res.send(orders);
})

app.post('/api/order', async(req, res) => {
    var newOrder = req.body;
    const response = await fnOrder.createOrder(newOrder);
    res.send(response);
})

app.delete('/api/order/:idOrder', async(req, res) => {
    var orderToDelete = req.params.idOrder;
    const response = await fnOrder.deleteOrder(orderToDelete);
    res.send(response);
})

app.listen(
    PORT,
    () => console.log(`Its alive on http://localhost:${PORT}`)
)