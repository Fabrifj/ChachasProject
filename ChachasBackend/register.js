const { firebase,register } = require("./config");
const fnHerramientas = require("./herramientas");

//Create Register of type Cuenta
/*  Body Structure
  {
    "CuentaInicial":(Number),
    "Fecha":"YYYY-MM-DD" o "YYYY-MM-DDTHH-MM-SS",
    "Origen":(IdSucursal)
  }
*/
async function createRegisterCuenta(body)
{
  var res = null;
  body.Egresos = 0;
  //body.Fecha = firebase.firestore.Timestamp.fromDate(new Date(body.Fecha));
  body.Fecha = fnHerramientas.stringAFecha(body.Fecha);
  body.Ingresos = 0;
  body.Saldo = body.CuentaInicial;
  body.Tipo = "Cuenta";

  console.log(body);
  await register.add(body).then((doc) => {
    console.log("Register of type cuenta Added");
    res = body;
  }).catch((error) => {
    console.log("Register not created");
  });

  return res;
}

// Create Register of type Ingreso or Egreso
/*  Body Structure
  {
    "Descripcion":"",
    "Fecha":"YYYY-MM-DD" o "YYYY-MM-DDTHH-MM-SS",
    "Monto":(Number),
    "Origen":(IdSucursal),
    "Tipo":(Ingreso or Egreso)
  }
*/
async function createRegisterIngresoEgreso(body)
{
  var res = null;
  var dateCheck = body.Fecha
  body.Fecha = fnHerramientas.stringAFecha(body.Fecha);
  // Test the date
  if(dateCheck.length > 10){
    dateCheck = dateCheck.split("T")[0];
  }

  var cuenta = await getCuentaByDate(dateCheck);
  if (cuenta != null){
    var saldo = cuenta.Saldo;
    var ingreso = cuenta.Ingresos;
    var egreso = cuenta.Egresos
    //Complete info of the body
    body.Saldo = saldo;

    // Create the register
    await register.add(body).then((doc) => {
      console.log("Register of type ingreso/egreso added");
      res = body;
    }).catch((error) => {
      console.log("Register not created");
    });

    // Update the information of the register Cuenta 
    if(body.Tipo == "Ingreso"){
      saldo += body.Monto;
      ingreso += body.Monto
    }else if (body.Tipo == "Egreso"){
      saldo -= body.Monto;
      egreso += body.Monto;
    }
    
    await register.doc(cuenta.id).set(
      {
        Egresos : egreso,
        Ingresos : ingreso,
        Saldo: saldo
      },
      { merge: true}
    );
  }
  
  return res;
}

// Get all the register of types Cuentas
async function getRegisterCuentas(){
  var res = null;
  const snapshot = await register
    .where("Tipo", "==", "Cuenta")
    .get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  if(list.length > 0){
    res = list;
  } 
  return res; 
}


// Get the information of a register of type Cuenta given a certain date
async function getCuentaByDate(date){
  var res = null;
  var cuentas = await getRegisterCuentas();

  cuentas.forEach(async (cuenta) => {
    var dateCuenta = cuenta.Fecha;
    dateCuenta = dateCuenta.toDate().toISOString().split("T")[0]; 
    if(date == dateCuenta){
      res = cuenta;
      return res;
    }
  });
  return res;
}

// Get the information of a register of type Cuenta given a certain ID
async function getRegisterByID(id){
  var res = await fnHerramientas.getDoc(id, "Caja");
  return res;
}

// Get Register Cuenta by subsidiary
async function getRegisterCuentaBySubsidiary(idSub){
  var res = null;
  const snapshot = await register
    .where("Tipo", "==", "Cuenta")
    .where("Origen", "==", idSub)
    .get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log("Hola");
  console.log(list);
  if(list.length > 0){
    res = list;
  } 
  return res; 
}

// Update a register of type Cuenta
async function updateRegisterCuenta(idCuenta, body)
{
	var respuesta = null;
	await register.doc(idCuenta).set(
		body,
		{ merge : true}
	);	
	
	respuesta = await getRegisterByID(idCuenta);
	return respuesta;
}

// Delete Register (Not Recommended)
async function deleteRegister(id)
{
    return fnHerramientas.deleteDoc(id,"Caja");
}

module.exports = {
  createRegisterCuenta,
  createRegisterIngresoEgreso,
  getRegisterCuentas,
  getCuentaByDate,
  getRegisterByID,
  getRegisterCuentaBySubsidiary,
  updateRegisterCuenta,
  deleteRegister
};
