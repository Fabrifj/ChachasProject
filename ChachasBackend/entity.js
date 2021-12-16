const { subsidiary, firebase } = require('./config');
const fnHerramientas = require("./herramientas");

async function getEntities()
{
    return await fnHerramientas.getDocs("Entidad");
}
async function getEntity(idEntity)
{
    return await fnHerramientas.getDoc(idEntity,"Entidad");
}
//CrearEntidad
/**
 * 
 * @param {} body tiene que tener la siguiente estructura:
{
	"Id":"jhijborhibibo",
	"Nombre":"",
	"Direccion":"",//
	"Localizacion":
    {
        "Longitud":"-16.505606488907098"
        "Latitud":"-68.1637419498145"
    },//Es el punto geografico con latitud y longitud
	"Telefono":
	"Departamento":"Cochabamba"//Tambien puede ser "La Paz"
	"Tipo":"Sucursal"//Puede ser Fabrica
}
 * 
 * 
 * @returns 
 */
async function createEntity(body){
    
    body.Localizacion = new firebase.firestore.GeoPoint(body.Localizacion.Latitud, body.Localizacion.Longitud)
    await subsidiary.add(body);
    respuesta = {
      "Message" : "Entity correctly added!",
      "Subsidiary": body
    }
    return respuesta;
  }

async function updateEntity(idEntity, body)
{
    return await fnHerramientas.updateDoc(idEntity,body,"Entidad");
}
async function deleteEntity(idEntity)
{
    return await fnHerramientas.deleteDoc(idEntity,"Entidad");
}


  module.exports = {
    getEntities,
    createEntity,
    deleteEntity,
    updateEntity,
    getEntity
  };