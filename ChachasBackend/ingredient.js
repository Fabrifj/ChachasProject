const {ingredient} = require('./config');
const fnHerramientas = require("./herramientas");

//Estructura en la base de datos
/*
Ingrediente //SOLO PARA FABRICA, SUCURSAL NO TIENE INGREDIENTE
[
	{
		"Id":"NDNDWCW283819",
		"Nombre":"Cebolla",
		"CantidadInventario":10,
		"CantidadMedida":1,
		"TipoUnidad":"kg",
		"CostoMedio":3
	},
	{
		"Id":"NDNDWCW283819",
		"Nombre":"Cebolla",
		"CantidadInventario":10,
		"CantidadMedida":1,
		"TipoUnidad":"kg",
		"CostoMedio":3
	}
]
*/

//create ingredient
/*
	{
		"Nombre":"Cebolla",
		"CantidadInventario":0,
		"TipoUnidad":"kg",
		"CostoMedio":0,
		"CantidadMinima":10
	}
*/
async function createIngredientInfo(body)
{
    return fnHerramientas.createDoc(body,"Ingrediente");
}

// Get all the ingredients
async function getIngredients()
{
    return fnHerramientas.getDocs("Ingrediente");
}

// Get an ingredient
async function getIngredient(idIn)
{
    return fnHerramientas.getDoc(idIn,"Ingrediente");
}

// Update information of an ingredient
/*
{
	"Nombre":"nuevo Nombre",
	"TipoUnidad":"nuevaUnidad",
	"CantidadMinima":
}
*/

async function updateIngredient(idIn, body)
{
	var respuesta = null;
	await ingredient.doc(idIn).set(body,{ merge : true});	
	
	respuesta = await getIngredient(idIn);
	return respuesta;
}

// Delete ingredient
async function deleteIngredient(idIn)
{
    return fnHerramientas.deleteDoc(idIn,"Ingrediente");
}

async function updateIngredientCostByMean(idIng, body)
{
	const myIng = await fnHerramientas.getDoc(idIng,"Ingrediente");
	const cantidadComprada = parseFloat(body.Cantidad);
	const costoCompra = parseFloat(body.Costo);
	const nuevoCosto = parseFloat( myIng.CantidadMedida*(costoCompra/cantidadComprada) );
	const nuevaCantidadInventarioTotal = parseFloat(myIng.CantidadInventario)+cantidadComprada;
	const costoFinal = ( ( (cantidadComprada * nuevoCosto) + (parseFloat(myIng.CantidadInventario) * parseFloat(myIng.CostoMedio)) ) / ( nuevaCantidadInventarioTotal ) );
	const upd = 
	{
		"CantidadInventario": nuevaCantidadInventarioTotal,
		"CostoMedio": costoFinal
	}
	await fnHerramientas.updateDoc(idIng,upd,"Ingrediente");
}

module.exports = {
  getIngredients,
  getIngredient,
  updateIngredient,
  deleteIngredient,
  createIngredientInfo,
  updateIngredientCostByMean
}

