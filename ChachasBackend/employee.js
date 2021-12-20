const { employee, firebase, subsidiary } = require('./config');
const fnHerramientas = require("./herramientas");
const fnSubsidiary = require("./subsidiary");

async function getEmployees()
{
    return await fnHerramientas.getDocs("Empleado");
}
async function getEmployee(idEmp)
{
    return await fnHerramientas.getDoc(idEmp,"Empleado");
}


// Get employee by domain
async function getEmployeesByDomain(idDom){
  var resp = null;
  var snapshot = await employee.where("Dominio", "==", idDom).get();
  var employees = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));

  if(employees.length > 0){
    resp = employees;
  }

  return resp;
}

/**
 * 
 * @param 
 * {
    "CI":"6793482",//Funciona nombre de cuenta, y tambien es el ID de empleado //Preguntarle al Inge
    "Password":"Pass123",
    "Dominio":"",//"Fabrica" o "ID-SUCURSAL"
    "Nombre":"Stephany",
    "ApellidoP":"Duran",
    "ApellidoM":"Borda",
    "Cargo":"Chef",
    "Tipo": ""// puede ser "Admin" o "Sucursal" o "Fabrica"
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
    .where("Nombre", '==', username)
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

// Get Entity by employee username and pass
async function getEntityByEmployeeUserAndPass(username,pass)
{
  var resp = null;
  const snapshot = await employee
    .where("Nombre", '==', username)
    .where("Password", "==", pass)
    .get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      if(list.length > 0){
        if (list[0].Dominio == "Admin"){
          resp = {
            "Entidad": list[0].Dominio,
            "idEntidad": list[0].id
          }
        }else{
          resp ={
            "Entidad": list[0].Tipo,
            "idEntidad": list[0].Dominio
          }
        }
      } else {
        console.log("El empleado no existe");
      }
  console.log(resp);
  return resp;
}

module.exports = {
    getEmployees,
    getEmployeesByDomain,
    createEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployee,
    updatePassword,
    authenticateEmployee,
    getEntityByEmployeeUserAndPass
  };
