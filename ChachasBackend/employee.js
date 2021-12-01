const { employee, firebase } = require('./config');
const fnHerramientas = require("./herramientas");

async function getEmployees()
{
    return fnHerramientas.getDocs("Empleado");
}
async function getEmployee(idEmp)
{
    return fnHerramientas.getDoc(idEmp,"Empleado");
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
    return fnHerramientas.updateDoc(idEmp,body,"Empleado");
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
    return fnHerramientas.updateDoc(idEmp,body,"Empleado");
}
async function deleteEmployee(idEmp)
{
    return fnHerramientas.deleteDoc(idEmp,"Empleado");
}

module.exports = {
    getEmployees,
    createEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployee,
    updatePassword
  };