const { entity, firebase, employee } = require('./config');
const fnHerramientas = require("./herramientas");
const fnEmployee = require("./employee");

async function getSubsidiaries()
{
    return await fnHerramientas.getDocs("Subsidiary");
}
async function getSubsidiary(idSubsidiary)
{
    return await fnHerramientas.getDoc(idSubsidiary,"Subsidiary");
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
    return await fnHerramientas.updateDoc(idSubsidiary,body,"Sucursal");
}
async function deleteSubsidiary(idSubsidiary)
{
    return await fnHerramientas.deleteDoc(idSubsidiary,"Sucursal");
}

/*
3 usuarios que tengan relacionados
    - 1 con idSubsidiary
    - 1 con idFactory
    - 1 con Admin => Entidad Admin
cuando me los pase y chekear estado

2) respuesta {status, entidad,idEntidad} RECIBE = nombre de usuario
            "=/= null",
            "Sucursal, Admin o Fabrica",
            "idEntidad"
*/
////////////////////////////////////////////////////////////////////////////
// Get Entity by employee id
async function getEntityByEmployee(body)
{
  var resp = null;
  //res = body;
  /*  body.Nombre,  body.ApellidoP,  body.ApellidoM  */
  /*  "Fabricio",  "Fernandez",  "Jauregui"  */
  await employee.where("Nombre", "==", body.Nombre)
  .where("ApellidoP", "==", body.ApellidoP)
  .where("ApellidoM", "==", body.ApellidoM).get().then(async (doc) => {
      if (doc.exists){
        var empleado = doc.data();
        if (empleado.Dominio == "Admin"){
          resp = {
            "Entidad": "Admin",
            "idEntidad": "Admin"
          }
        }else{
          resp ={
            "Entidad": getSubsidiary(empleado.Dominio).Tipo,
            "idEntidad": empleado.Dominio
          }
        }
        console.log("El empleado es:", doc.data());
      } else {
        console.log("El empleado no existe");
      }
    })
    .catch((error) => {
      resp = "Error retrieving employee";
    });
  return resp;
}
/*
async function getMermaSubsidiary(idSub) {
  var list = null;
  var result = [];
  await product.where("Origen", "==", idSub).get().then((snapshot) => {
    list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    for (i in list) {
      if (list[i].Mermas){
        for (j in list[i].Mermas) {
          list[i].Mermas[j].Fecha = (list[i].Mermas[j].Fecha).toDate().toDateString();
          result.push(list[i].Mermas[j])
        }
      }
    }
  }).catch((error) => {
    console.log(`Failed to get list of mermas: ${error}`);
  });
  
  return result;
}
*/

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
    getSubsidiary,
    getEntityByEmployee
  };