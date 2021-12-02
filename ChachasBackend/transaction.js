const { transaction, firebase, product, menu } = require('./config');
const fnHerramientas = require("./herramientas");
const fnProduct = require("./product");

async function getTransactions()
{
    return fnHerramientas.getDocs("Transaccion");
}
async function getTransaction(idTran)
{
    return fnHerramientas.getDoc(idTran,"Transaccion");
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
    //return fnHerramientas.createDoc(body,"Transaccion");
    //restar los productos del origen
    var listaProd = body.ListaProductos;
    var origen = body.IdOrigen;
    var destino = body.IdDestino;

    var cantidad;
    //console.log("listaProd: ",listaProd,"origen: ",origen,"destino: ", destino);

    for await (const element of listaProd){
        cantidad = element.Cantidad;

        await fnProduct.getProductById(element.IdProducto).then(producto =>{
            console.log("el origen es: ", origen);
            fnProduct.getProductTransaction(producto.IdMenu, origen).then(prodOrigen => {
                if(prodOrigen.CantidadInventario>cantidad)
                {
                    console.log("entra x q sise puede la transaccion", prodOrigen);
                    //Se extrae la cantidad de cierto producto.
                    fnProduct.updateProductAfterSale(prodOrigen.id, cantidad);

                    //se aumenta la cantidad al nuevo producto.
                    console.log("El producto al que se le suma es:",producto);
                    producto.CantidadInventario = producto.CantidadInventario + cantidad;
                    fnProduct.updateProduct(producto.id, producto);

                    //se gurada la transaccion
                    fnHerramientas.createDoc(body,"Transaccion");


                }else{
                    console.log("No se puede realizar la transaccion porq no hay suficiente cantidad en el producto: ", prodOrigen);
                }
                
            });
        } );
    };



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

async function updateTransaction(idTran, body)
{
    return fnHerramientas.updateDoc(idTran,body,"Transaccion");
}
async function deleteTransaction(idTran)
{
    return fnHerramientas.deleteDoc(idTran,"Transaccion");
}

module.exports = {
    getTransactions,
    getTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction    
};