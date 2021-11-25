const { response } = require('express');
const {order} = require('./config');

async function getAllOrders(){
    const snapshot = await order.get();
    const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
    return list;
}

async function createOrder(body){
    await order.add(body);
    return body;
}

async function deleteOrder(idorder){
    var res = null;
    await order.doc(idorder).delete().then(() => {
        res = "order deleted";
    }).catch((error) => {
        res = "Error deleting order"
    });
    return res;
}

module.exports = {
    getAllOrders,
    createOrder,
    deleteOrder
};