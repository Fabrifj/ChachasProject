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
async function getMermasWithNameMenu(){
  var mermas = await fnHerramientas.getDocs("Merma");
  var menus = await fnHerramientas.getDocs("Menu");
  var respuesta = [];
  mermas.forEach(element => {
        menus.forEach(m => {
          if(element.IdMenu == m.id){
            respuesta.push({
              "Cantidad":element.Cantidad,
              "CantidadResultante":element.CantidadResultante,
              "Estado":element.Estado,
              "Fecha":element.Fecha,
              "IdMenu":element.IdMenu,
              "IdSucursal":element.IdSucursal,
              "Observacion":element.Observacion,
              "NombreMenu":m.Nombre
            });
          }
        });
  });
  return respuesta;
}

//CrearMerma
/**
 * 
 * @param {} body tiene que tener la siguiente estructura:
Merma
{
	"IdMenu":,
	"IdSucursal":"",
	"Fecha":"",
	"Cantidad":,
  "Estado": "Revision", //Aprobado
  "Observacion": "",
  "CantidadRecibida":0
  };
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
    getMermasWithNameMenu,
    createMerma,
    deleteMerma,
    updateMerma,
    getMerma
  };