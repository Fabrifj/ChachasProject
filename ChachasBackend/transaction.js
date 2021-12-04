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
     var tipo;
     var idMenu;
     //console.log("listaProd: ",listaProd,"origen: ",origen,"destino: ", destino);
 
     for await (const element of listaProd){
         
         cantidad = element.Cantidad;
         console.log("CANTIDAD",element.Cantidad);        
         tipo =element.Tipo;
 
         if(tipo=="Chacha"){
 
             //Se extrae la cantidad de cierto producto.
             fnProduct.updateProductAfterSale(element.IdProducto, cantidad);
 
             //se aumenta la cantidad al nuevo producto
             idMenu=element.IdMenu;
             await fnProduct.getProductTransaction(idMenu, destino).then(prodDestino => {
                 prodDestino.CantidadInventario = prodDestino.CantidadInventario + cantidad;
                 
                 console.log("cantidad:",prodDestino);
                 console.log("el producto a aumentar:",prodDestino);
                 fnProduct.updateProduct(prodDestino.id, prodDestino); //No se pero el ai se crea solo.
             });
 
             //se gurada la transaccion
             
 
         }else{
             console.log("Es una salsa");
             //Se extrae la cantidad de cierto producto
             //await fnProduct.updateProductAfterSale(element.Nombre,element.Cantidad);
             //console.log("nombre del producto salsa:",element.Nombre,element.Cantidad);
 
             //se aumenta la cantidad al nuevo product
             var miDoc = null;
             var productos = await fnProduct.getAllProducts();
             var resultado = null;
             
             console.log("paso");
 
             productos.forEach(async (producto) => {
                 console.log(producto.Origen)
                 if(producto.Origen == origen && producto.Nombre == element.Nombre && producto.Tipo == "InsumoFabrica"){
                     
                 resultado = producto;
                 resultado.CantidadInventario = resultado.CantidadInventario - element.Cantidad;
                 fnProduct.updateProduct(resultado.id, resultado); //No se pero el ai se crea solo.
                 }
             });
 
             
 
             fnHerramientas.createDoc(body,"Transaccion");
             
             
 
 
         }
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