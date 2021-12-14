const { merma, firebase } = require('./config');
const fnHerramientas = require("./herramientas");

async function getMermas()
{
    return await fnHerramientas.getDocs("Merma");
}
async function getMerma(idMerma)
{
    return await fnHerramientas.getDoc(idMerma,"Merma");
}
//CrearMerma
/**
 * 
 * @param {} body tiene que tener la siguiente estructura:
Merma
{
	"Id":"BCHEBCOOQCBDOH",
	"IdMenu":,
	"IdSucursal":"",
	"Fecha":"",
	"Cantidad":
}
 * 
 * 
 * @returns 
 */
async function createMerma(body){
    
    //body.Fecha = firebase.firestore.Timestamp.fromDate(fnHerramientas.stringAFecha(body.Fecha));
    await merma.add(body);
    respuesta = {
      "Message" : "Merma correctly added!",
      "Merma": body
    }
    return respuesta;
  }

async function updateMerma(idMerma, body)
{
    return await fnHerramientas.updateDoc(idMerma,body,"Merma");
}
async function deleteMerma(idMerma)
{
    return await fnHerramientas.deleteDoc(idMerma,"Merma");
}


  module.exports = {
    getMermas,
    createMerma,
    deleteMerma,
    updateMerma,
    getMerma
  };