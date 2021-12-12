const {ingredient} = require('./config');
const fnHerramientas = require("./herramientas");

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
	await ingredient.doc(idIn).set(
		{
			"Nombre": body.Nombre,
			"TipoUnidad": body.TipoUnidad,
			"CantidadMinima": body.CantidadMinima
		},
		{ merge : true}
	);	
	
	respuesta = await getIngredient(idIn);
	return respuesta;
}

// Delete ingredient
async function deleteIngredient(idIn)
{
    return fnHerramientas.deleteDoc(idIn,"Ingrediente");
}

module.exports = {
  getIngredients,
  getIngredient,
  updateIngredient,
  deleteIngredient
}

