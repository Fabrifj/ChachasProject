const { subsidiary, firebase } = require('./config');

async function getSubsidiaries(){
    const snapshot = await subsidiary.get();
    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    return lista;
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


  module.exports = {
    getSubsidiaries,
    createSubsidiary
  };