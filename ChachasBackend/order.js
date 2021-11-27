const {order} = require('./config');
const fnProduct = require('./product');

async function getAllOrders(){
    var list = null;
    await order.get().then((snapshot) => {
        list = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
    }).catch((error) => {
        console.log(`Failed to get list of orders: ${error}`);
    });
    return list;
}

//revisar lista de productos, agarrar id y buscar en la coleccion de prductos y restar(llamar funcin de productos)
async function createOrder(body){
    for (i in body.Detalle) 
    {
        x = body.Detalle[i];
        await fnProduct.updateProductAfterSale(x.IdProducto, x.Cantidad).then(() => {
            console.log(`Product ${x.IdProducto} updated succesfully: -${x.Cantidad}`);
        }).catch((error) => {
            console.log(`Failed to update product ${x.IdProducto}: -${x.Cantidad}`);
        });
    }
    await order.add(body).then(() => {
        res = "order created succesfully";
    }).catch((error) => {
        res = "Failed to create order"
    });
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