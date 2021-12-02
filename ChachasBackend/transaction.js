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
    console.log("listaProd: ",listaProd,"origen: ",origen,"destino: ", destino);

    for await (const element of listaProd){
        cantidad = element.Cantidad;
        await fnProduct.getProductById(element.IdProducto).then(producto =>{
            if(producto.CantidadInventario>cantidad){
                console.log("Se puede hacer la transaccion", producto);
                //extraer CantidadInventario de un producto
                fnProduct.updateProductAfterSale(element.IdProducto, cantidad)



                
                json = {"Origen":producto.Origen,"IdMenu":producto.IdMenu}
                fnProduct.getProductTransaction(producto.IdMenu, producto.Origen).then(menu => {
                    console.log("el aux es: ", menu);

                    if(menu.length>0)
                    {
                        console.log("entra al aux", menu[0].CantidadInventario);
                        menu[0].CantidadInventario = menu[0].CantidadInventario + cantidad;
                        fnProduct.updateProduct(menu[0].id, menu[0]);
                        
                    }
                });
                
                fnHerramientas.createDoc(body,"Transaccion");
            }else{
                console.log("No se puede realizar la transaccion del elemento: ",producto.Nombre);
            }
        } );
    };



}
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