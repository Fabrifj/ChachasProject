
const { purchase, firebase } = require('./config');
const fnHerramientas = require("./herramientas");
const fnProduct = require("./product");
const fnIngredient = require("./ingredient");


async function getPurchase(idPurchase)
{
    return await fnHerramientas.getDoc(idPurchase,"Compra");
}
async function getPurchases()
{
    return await fnHerramientas.getDocs("Compra");
}

/*
//ESTRUCTURA EN LA BASE DE DATOS
{
	
	"Fecha":"2021-11-25",
	"ListaObjetos":
	[
		{
			"IdObjeto":"",//Puede ser "ID-PRODUCTO "(para sucursal) o "ID-INGREDIENTE" para fabrica
			"Costo":200,
			"Cantidad":10,//Lo que se introduzca tiene que estar medido como su producto
            "Tipo":"Refresco"//O puede ser "InsumoSucursal" --- En compra fabrica no existe tipo
		}
	]
	"Origen":"ID-SUCURSAL", //"Fabrica"
	"Factura":
	{
		"NITProveedor":"",
		"NombreProveedor":"",
		"NumeroFactura":"",
		"NITFactura":"",
		"NumeroAutorizacion":"",
		"FechaLimiteEmision":""
	}
    "Total":200
}
*/
//ESTRUCTURA PARA CREAR LA COMPRA
/**
 * 
 * @param 
{
	
	"Fecha":"2021-11-25",
	"ListaObjetos":
	[
		{
			"IdObjeto":"",//Puede ser "ID-PRODUCTO "(para sucursal) o "ID-INGREDIENTE" para fabrica
			"Costo":200,
			"Cantidad":10,//Lo que se introduzca tiene que estar medido como su producto
		}
	]
	"Origen":"ID-SUCURSAL", //"Fabrica"
	"Factura":
	{
		"NITProveedor":"",
		"NombreProveedor":"",
		"NumeroFactura":"",
		"NITFactura":"",
		"NumeroAutorizacion":"",
		"FechaLimiteEmision":""
	}
}
 body 
 */
async function createPurchase(body)
{
    if(body.hasOwnProperty('Fecha'))
    {
        body.Fecha = fnHerramientas.stringAFirebaseTimestamp(body.Fecha);
    }
    if(body.hasOwnProperty('Factura'))
    {
        if(body.Factura.hasOwnProperty('FechaLimiteEmision'))
        {
            body.Factura.FechaLimiteEmision = fnHerramientas.stringAFirebaseTimestamp(body.Factura.FechaLimiteEmision);
        }
    }
    if(body.hasOwnProperty('Origen'))
    {
        if(body.Origen == "Fabrica")
        {
            var miTot = 0;
            for await (const ing of body.ListaObjetos) 
            {
                //const miIng = await fnHerramientas.getDoc(ing.IdObjeto,"Ingrediente");
                miTot += parseFloat(ing.Costo);
                var updCosto = 
                {
                    "Cantidad": parseFloat(ing.Cantidad),
                    "Costo":parseFloat(ing.Costo)
                }
                console.log("UPDCOSTO: ",updCosto);
                fnIngredient.updateIngredientCostByMean(ing.IdObjeto, updCosto);
            }
            body.Total = miTot;

        }
        else
        {
            var miTot = 0;
            for await (const prod of body.ListaObjetos) 
            {
                console.log("MI ID DE PRODUCTO ES>>>>", prod.IdObjeto);
                var miProd = await fnHerramientas.getDoc(prod.IdObjeto,"Producto");
                console.log("MIPRODUCTO: >>>",miProd)
                prod.Tipo = miProd.Tipo;
                miTot += parseFloat(prod.Costo);
                var updCosto = 
                {
                    "Cantidad": parseFloat(prod.Cantidad),
                    "Costo":parseFloat(prod.Costo)
                }
                console.log("UPDCOSTO: ",updCosto);
                fnProduct.updateProductPriceByMean(prod.IdObjeto, updCosto);
            }
            body.Total = miTot;
        }
    }
    return fnHerramientas.createDoc(body,"Compra");
}
async function deletePurchase(idPurchase)
{
    return await fnHerramientas.deleteDoc(idPurchase,"Compra");
}
async function updatePurchase(idPurchase, body)
{
    if(body.hasOwnProperty('Fecha'))
    {
        body.FechaNacimiento = fnHerramientas.stringAFirebaseTimestamp(body.Fecha);
    }
    if(body.hasOwnProperty('Factura'))
    {
        if(body.Factura.hasOwnProperty('FechaLimiteEmision'))
        {
            body.Factura.FechaLimiteEmision = fnHerramientas.stringAFirebaseTimestamp(body.Factura.FechaLimiteEmision);
        }
    }
    return await fnHerramientas.updateDoc(idPurchase,body,"Compra");
}
module.exports = {
    getPurchases,
    createPurchase,
    deletePurchase,
    updatePurchase,
    getPurchase
  };