const { employee, firebase } = require('./config');
const fnHerramientas = require("./herramientas");

async function getEmployees()
{
    return await fnHerramientas.getDocs("Empleado");
}
async function getEmployee(idEmp)
{
    return await fnHerramientas.getDoc(idEmp,"Empleado");
}

/**
 * 
 * @param 
 * {
    "CI":"6793482",
    "Password":"Pass123",
    "Dominio":"",//"ID-ENTIDAD" o "Admin"
    "Nombre":"Stephany",
    "ApellidoP":"Duran",
    "ApellidoM":"Borda",
    "Cargo":"Chef",
	  "Tipo":""//Fabrica, Sucursal, Admin
} body 
 * @returns 
 */
async function createEmployee(body) 
{
    const idEmp = body.CI;
    delete body.CI;
    await employee.doc(idEmp).set(body);
    respuesta = {
      Message: "Empleado agregado correctamente",
      Employee: body,
    };
    return respuesta;
}
async function updateEmployee(idEmp, body)
{
    return await fnHerramientas.updateDoc(idEmp,body,"Empleado");
}
/**
 * 
 * @param 
 * {
 *      "IdEmpleado":"463289",
 *      "Password":"NuevaPass"
 * } body 
 * @returns 
 */
async function updatePassword(body)
{
    const idEmp = body.IdEmpleado;
    delete body.IdEmpleado;
    return await fnHerramientas.updateDoc(idEmp,body,"Empleado");
}
async function deleteEmployee(idEmp)
{
    return await fnHerramientas.deleteDoc(idEmp,"Empleado");
}

// Authenticate employee
async function authenticateEmployee(username, pass){
  var resp = null;

  const snapshot = await employee
    .where("NombreUsuario", '==', username)
   .where("Password", "==", pass)
    .get();
  
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  if(list.length > 0){
    resp = 
      {
        "Status": true,
        "Cargo": list[0].Cargo,
        "Dominio": list[0].Dominio
      }
  }else{
    resp = 
      {
        "Status": false
      }
  }
  console.log(resp);
  return resp;
}

module.exports = {
    getEmployees,
    createEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployee,
    updatePassword,
    authenticateEmployee
  };
