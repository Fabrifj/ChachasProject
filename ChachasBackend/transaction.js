const { json } = require('express');
const { transaction, firebase, product, menu } = require('./config');
const fnHerramientas = require("./herramientas");
const fnProduct = require("./product");
const fnMerma = require("./merma");

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
 * Transaccion tipo "Fabrica" 
 * //Para enviar salsas o chachas a las sucursales.
 {
     "Fecha":"2020-03-23",
     "IdOrigen":"Lbh5237VEKHWHzRlhnwB",
     "IdDestino":"mAlmWL1myFMGbZW8WHw3",
     "Tipo":"Fabrica",
     "ListaProductos":
     [
        {
             "IdProducto":"VwPrKemClwQ6zw46kVMa",
             "Tipo":"Chacha",
             "Cantidad":1,
             "TipoUnidad":"unidad",
             "Nombre":"Chacha Prehecha de carne"
         },
         {
             "IdProducto":"1GQcA1ELZufELjBGbgoo",
             "Tipo":"InsumoFabrica",
             "Cantidad":10,
             "TipoUnidad":"ml",
             "Nombre":"Salsa de Mani"
         }
         
     ]
 }
 /////////////////////////////////////////////////////////
 * Transaccion tipo "Sucursales" 
 * //Para enviar mermas de una suscursal a la Fabrica.
 * 
 * {
     "Fecha":"2020-03-23",
     "IdOrigen":"GfkkDi4yFpCCVFW2RlF9",
     "IdDestino":"Lbh5237VEKHWHzRlhnwB",
     "Tipo":"Sucursal",
     "ListaProductos":
     [
        {
             "IdProducto":"A5Y37a7Spo4hutepTiHS",
             "Fecha":"25-12-2021"
         }
         
     ]
 }
 * /////////////////////////////////////////////////////////
 * Transaccion tipo "Intercambio" 
 * //Para enviar chachas o salsas solo entre sucursales.
 * //El origen es la sucursal que tiene para dar y destino es la sucursal que necesita.
 * {
     "Fecha":"2020-03-23",
     "IdOrigen":"GfkkDi4yFpCCVFW2RlF9",
     "IdDestino":"mAlmWL1myFMGbZW8WHw3",
     "Tipo":"Intercambio",
     "ListaProductos":
     [
        {
             "IdProducto":"A5Y37a7Spo4hutepTiHS",
             "Tipo":"Chacha",
             "Cantidad":1,
             "TipoUnidad":"unidad",
             "Nombre":"Chacha Prehecha de carne"
         },
         {
             "IdProducto":"PSwF9SSfg4ywcJTifjgC",
             "Tipo":"InsumoFabrica",
             "Cantidad":10,
             "TipoUnidad":"ml",
             "Nombre":"Salsa de Mani"
         }
         
     ]
 }
 * @returns 
 */
 async function createTransaction(body) 
{
    body.Fecha = firebase.firestore.Timestamp.fromDate(fnHerramientas.stringAFecha(body.Fecha));
    console.log("Entra",body.Tipo);
    switch(body.Tipo)
    {
        case "Fabrica":
            var productos = await fnProduct.getAllProducts();
            var idMenu;

            body.ListaProductos.forEach(element => {
                if(element.Tipo == "Chacha")
                {
                    productos.forEach(async (producto) => {
                        if(producto.id == element.IdProducto){
                        resultado = producto;
                        idMenu = resultado.IdMenu;
                        resultado.CantidadInventario = resultado.CantidadInventario - element.Cantidad;
                        fnProduct.updateProduct(resultado.id, resultado); //No se pero el ai se crea solo.
                        }
                        
                    });
                    productos.forEach(async (producto) => {
                        if(producto.Origen == body.IdDestino && producto.IdMenu == idMenu && producto.Tipo == "Chacha"){
                            resultado = producto;
                            resultado.CantidadInventario = resultado.CantidadInventario + element.Cantidad;
                            fnProduct.updateProduct(resultado.id, resultado); //No se pero el ai se crea solo.
                        }
                    });
                }else{
                    console.log("Cualquier otro tipo de insumo por parte de la Fabrica");

                    productos.forEach(async (producto) => {
                        if(producto.id == element.IdProducto){
                        resultado = producto;
                        resultado.CantidadInventario = resultado.CantidadInventario - element.Cantidad;
                        fnProduct.updateProduct(resultado.id, resultado); //No se pero el ai se crea solo.
                        }
                        if(producto.Nombre == element.Nombre && producto.Origen == body.IdDestino)
                        {
                            resultado = producto;
                            resultado.CantidadInventario = resultado.CantidadInventario + element.Cantidad;
                            fnProduct.updateProduct(resultado.id, resultado); //No se pero el ai se crea solo
                        }
                        
                    });
                }
            });

            fnHerramientas.createDoc(body,"Transaccion");
            
            break;
        case "Sucursal":
            var productos = await fnProduct.getAllProducts();
            var suma = 0;
            var enviar;

            body.ListaProductos.forEach(element => {
               
                productos.forEach(async (producto) => {
                    if(producto.id == element.IdProducto){
                       console.log("el prducto es:",producto);
                       producto.Mermas.forEach(mermas => {
                           suma = suma + mermas.Cantidad; 
                       });
                       console.log("La cantidad total de mermas es:",suma);
                       //se recetea el array mermas de este producto
                       producto.Mermas = [];
                       fnProduct.updateProduct(producto.id,producto);

                       //creacion de elemento merma 
                       enviar = {
                        "IdMenu":producto.IdMenu,
                        "IdSucursal":body.IdOrigen,
                        "Fecha":body.Fecha,
                        "Cantidad":suma,
                        "Estado": "Revision",
                        "Observacion": "",
                        "CantidadRecibida":0
                        };
                       console.log("Loque se enviaria: ",enviar);
                       fnMerma.createMerma(enviar);

                       //crear la transaccion
                       fnHerramientas.createDoc(body,"Transaccion");

                    }
                });               

            });


            break;
        case "Intercambio":
            //restar los productos del origen
            var listaProd = body.ListaProductos;
            var origen = body.IdOrigen;
            var destino = body.IdDestino;
            

            var cantidad;
            var tipo;
            var idMenu;

            for await (const element of listaProd){
                
                cantidad = element.Cantidad;  
                tipo =element.Tipo;

                if(tipo=="Chacha"){

                    //Se extrae la cantidad de cierto producto.
                    fnProduct.updateProductAfterSale(element.IdProducto, cantidad);

                    //se aumenta la cantidad al nuevo producto
                    idMenu=element.IdMenu;
                    await fnProduct.getProductTransaction(idMenu, destino).then(prodDestino => {
                        prodDestino.CantidadInventario = prodDestino.CantidadInventario + cantidad;
                        fnProduct.updateProduct(prodDestino.id, prodDestino); //No se pero el ai se crea solo.
                    });

                    //se gurada la transaccion
                    

                }else{
                    
                    var miDoc = null;
                    var productos = await fnProduct.getAllProducts();
                    var resultado = null;
                
                    productos.forEach(async (producto) => {
                        
                        if(producto.Origen == origen && producto.Nombre == element.Nombre && producto.Tipo == "InsumoFabrica"){
                        resultado = producto;
                        resultado.CantidadInventario = resultado.CantidadInventario - element.Cantidad;
                        fnProduct.updateProduct(resultado.id, resultado); //No se pero el ai se crea solo.
                        }
                        if(producto.Origen == destino && producto.Nombre == element.Nombre && producto.Tipo == "InsumoFabrica"){
                            resultado = producto;
                            resultado.CantidadInventario = resultado.CantidadInventario + element.Cantidad;
                            fnProduct.updateProduct(resultado.id, resultado); //No se pero el ai se crea solo.
                        }
                    });

                    fnHerramientas.createDoc(body,"Transaccion");
                }
            };
            break;
        default:
            console.log("error no exite ese tipo de transaccion");
            break;
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