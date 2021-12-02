const { purchase, firebase } = require('./config');
const fnHerramientas = require("./herramientas");
const fnProduct = require("./product");

async function getPurchase(idPurchase)
{
    return fnHerramientas.getDoc(idPurchase,"Compra");
}
async function getPurchases()
{
    return fnHerramientas.getDocs("Compra");
}

/**
 * 
 * @param 
 {
	"Fecha":"2021-11-25",
	"IdProducto":"",
	"Costo":200,
	"Cantidad":10,//Lo que se introduzca tiene que estar medido como su producto
	"Origen":"ID-SUCURSAL",
} body 
 * @returns 
 */
async function createPurchase(body)
{
    body.Fecha = fnHerramientas.stringAFirebaseTimestamp(body.Fecha);
    var miProd = fnProduct.getProductById(body.IdProducto);
    body.Tipo = miProd.Tipo;
    var updCosto = 
    {
        "IdProducto":body.IdProducto,
        "Cantidad":body.Cantidad,
        "Costo":body.Costo
    }
    //Aqui estaria el metodo de los chicos si tan solo lo hubieran hecho >:(
    return fnHerramientas.createDoc(body,"Compra");
}
async function updatePurchase(idPurchase, body)
{
    if(body.hasOwnProperty('Fecha'))
    {
        body.FechaNacimiento = fnHerramientas.stringAFirebaseTimestamp(body.Fecha);
    }
    return fnHerramientas.updateDoc(idPurchase,body,"Compra");
}
async function deletePurchase(idPurchase)
{
    return fnHerramientas.deleteDoc(idPurchase,"Compra");
}


module.exports = {
    getPurchases,
    createPurchase,
    deletePurchase,
    updatePurchase,
    getPurchase
  };