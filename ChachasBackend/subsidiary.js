const { subsidiary, firebase } = require('./config');
const fnHerramientas = require("./herramientas");

async function getSubsidiaries()
{
    return await fnHerramientas.getDocs("Sucursal");
}
async function getSubsidiary(idSubsidiary)
{
  // console.log("Test subsidiary hola")
    return await fnHerramientas.getDoc(idSubsidiary,"Sucursal");
}
//CrearSucursal
/**
 * 
 * @param {} body tiene que tener la siguiente estructura:
{
	"Id":"jhijborhibibo",
	"Nombre":"",
	"Direccion":"",//
	"Localizacion":
    {
        "Latitud":"-68.1637419498145",
        "Longitud":"-16.505606488907098"
        
    },//Es el punto geografico con latitud y longitud
	"Telefono":
	"Departamento":"Cochabamba"//Tambien puede ser "La Paz"
  "Tipo":"Sucursal"//"Fabrica"
}
 * 
 * 
 * @returns 
 */
async function createSubsidiary(body){
    
    body.Localizacion = new firebase.firestore.GeoPoint(body.Localizacion.Latitud, body.Localizacion.Longitud)
    await subsidiary.add(body);
    respuesta = {
      "Message" : "Susidiary correctly added!",
      "Subsidiary": body
    }
    return respuesta;
  }

async function updateSubsidiary(idSubsidiary, body)
{
    return await fnHerramientas.updateDoc(idSubsidiary,body,"Sucursal");
}
async function deleteSubsidiary(idSubsidiary)
{
    return await fnHerramientas.deleteDoc(idSubsidiary,"Sucursal");
}

/*
10.- crear producto salsa receta informacion
{
	"Nombre" : "salsa de mani",
	"CantidadResultante":,
	"TipoDeUnidad": "ml"
	"CantidadMinima":100 
	"ListaIngredientes":[
		{
			"Nombre":"",
			"Cantidad": , 
			"TipoUnidad" :  
		}
		
	]
}
*/
// Create product salsa receta informacion
async function createProductSalsaRecetaInformacion(body, type) {
  body.Tipo = type;
  body.Costo = 0;
  await product.add(body);
  return body;
}
/*
11.- modificar producto salsa receta informacion
{
	"Nombre" : "salsa de mani",
	"CantidadResultante":,
	"TipoDeUnidad": "",
	"CantidadMinima":, 
	"ListaIngredientes":[
		{
			"Nombre":"",
			"Cantidad": , 
			"TipoUnidad" :  
		}
	]
}
*/
// Update product salsa receta informacion
async function updateProductSalsaRecetaInforacion(idproduct, body) {
  var res = null;
  await product
    .doc(idproduct)
    .update(body)
    .then(() => {
      res = body;
    })
    .catch((error) => {
      res = "Error updating product";
    });
  return res;
}


  module.exports = {
    getSubsidiaries,
    createSubsidiary,
    deleteSubsidiary,
    updateSubsidiary,
    getSubsidiary
  };