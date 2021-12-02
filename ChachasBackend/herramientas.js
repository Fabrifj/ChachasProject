const firebase = require('firebase')
const db = firebase.firestore();
function stringAFecha(fecha) {
  var parts = fecha.split("-");
  // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
  // January - 0, February - 1, etc.
  var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
  return mydate;
}
//Get all docs
async function getDocs(nombreEntidad){
  const snapshot = await db.collection(nombreEntidad).get();
  const lista = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  return lista;
}
//Get Doc with ID
async function getDoc(idDoc,nombreEntidad) {
  var miDoc = null;
  await db.collection(nombreEntidad)
    .doc(idDoc)
    .get()
    .then((doc) => {
      if (doc.exists) {
        miDoc = doc.data();

        console.log(`Data ${nombreEntidad}:`, miDoc);
      } else {
        // doc.data() will be undefined in this case
        console.log(`El/La ${nombreEntidad} no existe!`);
      }
    })
    .catch((error) => {
      console.log(`Error obteniendo ${nombreEntidad}:`, error);
    });

  return miDoc;
}
//UpdateDoc
async function updateDoc(idDoc, nuevoPar, nombreEntidad) {
  var respuesta = null;
  await db.collection(nombreEntidad)
    .doc(idDoc)
    .update(nuevoPar)
    .then(() => {
      respuesta = nuevoPar;
      console.log(`${nombreEntidad} actualizad@ correctamente!`);
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error(`Error al actualizar : ${nombreEntidad}`, error);
    });

  return respuesta;
}
//EliminarDoc
async function deleteDoc(idDoc,nombreEntidad) {
  var respuesta = null;
  await db.collection(nombreEntidad).doc(idDoc).delete().then(() => {
    respuesta = `${nombreEntidad} correctamente eliminad@!`
    console.log(respuesta);
  }).catch((error) => {
    console.error(`Error al eliminar  ${nombreEntidad}: `, error);
  });
  return respuesta;
}
//CrearDoc
async function createDoc(data, nombreEntidad){
  await db.collection(nombreEntidad).add(data);
  respuesta = {
    "Mensaje" : `${nombreEntidad} agregado correctamente`,
    "Elemento": data
  }
  return respuesta;
}



module.exports = {
  stringAFecha,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  createDoc
};
