const { subsidiary, firebase } = require('./config');
const fnHerramientas = require("./herramientas");

async function getSubsidiaries()
{
    return fnHerramientas.getDocs("Sucursal");
}
async function getSubsidiary(idSubsidiary)
{
    return fnHerramientas.getDoc(idSubsidiary,"Sucursal");
}
//CrearCategoria
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
    return fnHerramientas.updateDoc(idSubsidiary,body,"Sucursal");
}
async function deleteSubsidiary(idSubsidiary)
{
    return fnHerramientas.deleteDoc(idSubsidiary,"Sucursal");
}


  module.exports = {
    getSubsidiaries,
    createSubsidiary,
    deleteSubsidiary,
    updateSubsidiary,
    getSubsidiary
  };