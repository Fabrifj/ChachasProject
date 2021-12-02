const { transaction, firebase } = require('./config');
const fnHerramientas = require("./herramientas");

async function getTransactions()
{
    return fnHerramientas.getDocs("Transaccion");
}
/**
 * 
 * @param {} body 
 * Transaccion
 {
     "Fecha":"2020-03-23"
     "IdOrigen":"",
     "IdDestino":""
     "ListaProductos":
     [
         {
             "IdProducto":"",
             "Tipo":"Chacha" //O tipo Refresco, porque se miden unitariamente
             "Cantidad":,
             "NombreProducto":,
         },
         {
             "IdProducto":"",
             "Tipo":"InsumoFabrica"//O tipo InsumoSucursal, porque se miden NO unitariamente
             "CantidadMedida":1000,
             "TipoUnidad":"ml",
             "NombreProducto":"Salsa Picante"
         }
     ]
 }
 * @returns 
 */
async function createTransaction(body) 
{
    body.Fecha = firebase.firestore.Timestamp.fromDate(fnHerramientas.stringAFecha(body.Fecha));
    return fnHerramientas.createDoc(body,"Transaccion");
}

module.exports = {
    getTransactions,
    createTransaction
};