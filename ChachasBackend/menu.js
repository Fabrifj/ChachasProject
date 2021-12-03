const { menu, firebase } = require('./config');


//CreateMenu
/**
 * @param {} body tiene que tener la siguiente estructura:
 {
    "Nombre": "Chacha de Carne",
    "ImgURL":""
 }
 * 
 * @returns
 */

 async function createMenu(body){
    await menu.add(body);
    respuesta = {
        "Message" : "Menu correctly added!",
        "Menu": body
    }
    return respuesta;
}

//Get all the Menus
async function getMenus(){
    const snapshot = await menu.get();
    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    return lista;
}

// Get Menu by name
/**
 * @param {} body tiene que tener la siguiente estructura:
 * {
 *      "Nombre": "Chacha de Carne"
 * }
 * @returns
 */
async function getMenuName(men) {
    let query = await menu.where('Nombre', '==', men.Nombre);
    let querySnapshot = await query.get();
    let respuesta = null;
    
    if (querySnapshot.empty) {
      console.log(`No encontramos el menu con el nombre: ${men.Nombre}`);
    } else {
      console.log('Encontramos el menu: ', men.Nombre);
      respuesta = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }
    return respuesta;
  }



//UpdateMenu
/**
 * @param {} body tiene que tener la siguiente estructura:
 {
    "Nombre": "Chacha de Carne",
    "ImgURL":""
 }
 * 
 * @returns
 */

async function updateMenu(idMen, men) {  
    var respuesta = null;
    await menu.doc(idMen).update(men)
    .then(() => 
    {
      respuesta = men;  
      console.log("Menu fue actualizado correctamente!");
    })
    .catch((error) => 
    {
        // The document probably doesn't exist.
        console.error("Error al actualizar el menu: ", error);
    });
  
    return respuesta;
}


//Delete Menu by Id
async function deleteMenu(idMen) {
    var respuesta = null;
    await menu.doc(idMen).delete().then(() => {
      respuesta = "Menu correctamente eliminada!"
      console.log(respuesta);
    }).catch((error) => {
      console.error("Error al eliminar el menu: ", error);
    });
    return respuesta;
  }


module.exports = {
    getMenus,
    getMenuName,
    createMenu,
    updateMenu,
    deleteMenu
    
  };