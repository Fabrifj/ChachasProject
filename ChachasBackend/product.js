const { firebase,product } = require("./config");
const fnHerramientas = require('./herramientas');

//GetAllProducts or the collection
async function getAllProducts() {
  const snapshot = await product.get();
  const list = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return list;
}

//Body structure for the creation of

// Product of type Chacha
/*
  {
    "IdMenu":"rnfqubrvibvi" //Esto representa a la Chacha de Carne 
    "Origen": "ID-SUCURSAL",
    "Precio":10,
    "CantidadInventario":16,
    "CantidadMinima: 2
  }
*/

// Product of type Refresco
/*
  {
    "Nombre":"Coca-Cola" 
    "Origen": "ID-SUCURSAL",
    "Precio":13,
    "CantidadInventario":20,
    "CantidadMinima":
  },
*/

// Product of type InsumoSucursal
/*
  {
    "Nombre":"Aceite" 
    "Origen": "ID-SUCURSAL",
    "CantidadInventario":1600,
    "CantidadMedida":900,
    "TipoUnidad":"ml",
    "CantidadMinima":
  } 
*/

// Product of type InsumoFabrica
/*
  {
    "Nombre":"Salsa Picante"
    "Origen": "ID-SUCURSAL",
    "CantidadInventario":1600,
    "CantidadMedida":900,
    "TipoUnidad":"ml",
    "CantidadMinima":
  }
*/

//Create a new product of some type
async function createProductType(body, type){
  body.Tipo = type;
  body.Costo = 0;
  await product.add(body);
  return body;
}

//Create a generic product (Factory)
async function createProduct(body) {
  await product.add(body);
  return body;
}

//Delete a producto from the collection
async function deleteProduct(idproduct) {
  var res = null;
  await product
    .doc(idproduct)
    .delete()
    .then((doc) => {
      res = "deleted";
    })
    .catch((error) => {
      res = "Error deleting product";
    });
  return res;
}

//Update a product
async function updateProduct(idproduct, body) {
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

//Get product by id
async function getProductById(idproduct) {
  var res = null;
  await product
    .doc(idproduct)
    .get()
    .then((doc) => {
      if (doc.exists) {
        res = { id: doc.id, ...doc.data() };
        console.log("Informacion de la compra:", doc.data());
      } else {
        console.log("La compra no existe");
      }
    })
    .catch((error) => {
      res = "Error retrieving product";
    });
  return res;
}
//Update inventory after sale
async function updateProductAfterSale(idproduct, quantity) {
  var res = null;
  var productToUpdate = await getProductById(idproduct);
  console.log(productToUpdate);
  productToUpdate.CantidadInventario =
    parseInt(productToUpdate.CantidadInventario, 10) - quantity;
  await product
    .doc(idproduct)
    .update(productToUpdate)
    .then(() => {
      res = productToUpdate;
    })
    .catch((error) => {
      res = "Error updating product";
    });
  return res;
}

//Get a list of products froma certain subsidiary and type
async function getProductSubsidiaryType(idSub, type) {
  const snapshot = await product
    .where("Origen", "==", idSub)
    .where("Tipo", "==", type)
    .get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(list);
  if(list.length == 0){
    return null;
  }else{
    return list;
  }
}

//Get a list of products froma certain subsidiary 
async function getProductSubsidiary(idSub) {
  const snapshot = await product
    .where("Origen", "==", idSub)
    .get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(list);
  return list;
}

//Update mermas of an product
/*
  {
    "Fecha":"",
    "Cantidad":""
  }
*/

//Update the information of mermas of a product
async function updateMermasProduct(idProd,body) {
  var respuesta = null;
  var date = fnHerramientas.stringAFecha(body.Fecha)
  body.Fecha = firebase.firestore.Timestamp.fromDate(new Date(date));
  console.log(body);

  await product.doc(idProd).get().then(async (doc) => {
    if(doc.exists){
      var prodData = doc.data();

      if(prodData.Mermas){
          
        console.log("Ya hay mermas");
        await product.doc(idProd).update({
         "Mermas" : firebase.firestore.FieldValue.arrayUnion(body)
        });
        console.log("Merma information added correctly");

      }else{
        console.log("No hay mermas");
        await product.doc(idProd).set({"Mermas": body}, {merge: true});
        console.log("Merma information added correctly")
      }
      respuesta = await getProductById(idProd);
    
    }else{
      console.log("The product does not exist")
    }
  })
  
  return respuesta;
}


module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  updateProductAfterSale,
  getProductSubsidiaryType,
  getProductSubsidiary,
  createProductType,
  updateMermasProduct
};
