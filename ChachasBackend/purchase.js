
const { purchase, firebase } = require('./config');
const fnHerramientas = require("./herramientas");
const fnProduct = require("./product");


async function getPurchase(idPurchase)
{
    return await fnHerramientas.getDoc(idPurchase,"Compra");
}
async function getPurchases()
{
    return await fnHerramientas.getDocs("Compra");
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
    console.log("Body: ", body);
    var fecha = body.Fecha;
    var nuevaFecha = fnHerramientas.stringAFirebaseTimestamp(fecha);
    body.Fecha = nuevaFecha;
    var miProd = await fnProduct.getProductById(body.IdProducto);
    console.log("MIPRODUCTO: >>>",miProd)
    body.Tipo = miProd.Tipo;
    var updCosto = 
    {
        "Cantidad": parseFloat(body.Cantidad),
        "Costo":parseFloat(body.Costo)
    }
    console.log("UPDCOSTO: ",updCosto);
    fnProduct.updateProductPriceByMean(body.IdProducto, updCosto);
    return await fnHerramientas.createDoc(body,"Compra");
}
async function updatePurchase(idPurchase, body)
{
    if(body.hasOwnProperty('Fecha'))
    {
        body.FechaNacimiento = fnHerramientas.stringAFirebaseTimestamp(body.Fecha);
    }
    return await fnHerramientas.updateDoc(idPurchase,body,"Compra");
}
async function deletePurchase(idPurchase)
{
    return await fnHerramientas.deleteDoc(idPurchase,"Compra");
}


module.exports = {
    getPurchases,
    createPurchase,
    deletePurchase,
    updatePurchase,
    getPurchase
  };