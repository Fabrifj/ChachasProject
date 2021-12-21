const {order} = require('./config');
const fnProduct = require('./product');
const fnRegister = require('./register');
const fnHerramientas = require('./herramientas');

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
    var monto = 0;
    for (i in body.Detalle) 
    {
        x = body.Detalle[i];
        monto = monto + x.Precio
        await fnProduct.updateProductAfterSale(x.IdProducto, x.Cantidad).then(() => {
            console.log(`Product ${x.IdProducto} updated succesfully: -${x.Cantidad}`);
        }).catch((error) => {
            console.log(`Failed to update product ${x.IdProducto}: -${x.Cantidad}`);
        });
    }

    var dateCheck = fnHerramientas.stringAFecha(body.Fecha);
    // Test the date
    if(dateCheck.length > 10){
        dateCheck = dateCheck.split("T")[0];
    }
    var cuenta = await fnRegister.getCuentaByDate(dateCheck);
    if (cuenta == null){
        console.log("Creating cuenta");
        await fnRegister.createRegisterCuenta({
            "CuentaInicial":0,
            "Fecha":body.Fecha,
            "Origen":body.IdSucursal,
        }).then(() => {
            console.log("Cuenta registered");
        }).catch((error) => {
            console.log(error);
        });
    }

    await fnRegister.createRegisterIngresoEgreso({
        "Descripcion":"Pedido",
        "Fecha":body.Fecha,
        "Monto":monto,
        "Origen":body.IdSucursal,
        "Tipo":"Ingreso"
    }).then(() => {
        console.log("Ingreso registered");
    }).catch((error) => {
        console.log(error);
    });

    await order.add(body).then(() => {
        console.log("order created succesfully");
    }).catch((error) => {
        console.log("Failed to create order");
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