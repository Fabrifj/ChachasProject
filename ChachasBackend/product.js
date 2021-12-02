const { product } = require("./config");

async function getAllProducts() {
  const snapshot = await product.get();
  const list = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return list;
}

async function createProduct(body) {
  await product.add(body);
  return body;
}

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

// get product by id
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
// update inventory after sale
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

// Get a list of products froma certain subsidiary and type
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

// Get a list of products froma certain subsidiary 
async function getProductSubsidiary(idSub) {
  const snapshot = await product
    .where("Origen", "==", idSub)
    .get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(list);
  return list;
}
/*
Generar un metodo para actualizar el costo de un producto
basandose en la media. (Tomar en cuenta cantidad y costo)
  Lo que nos pasan
    {
      "CostoUnitario":"",
      "IdProducto":"",
      "Cantidad":""
    }
*/

async function updateProductPriceByMean(idproduct, body){
  var res = null;
  var costoFinal = 0;
  var costoEstandarizado = 0;
  var nuevaCantidadInventarioTotal = 0;
  var productToUpdate = await getProductById(idproduct)//product.doc(idproduct).get().data;
  console.log(productToUpdate);
  if(productToUpdate.Tipo == "InsumoSucursal" || productToUpdate.Tipo == "InsumoFabrica" ){ 
    costoEstandarizado = (productToUpdate.CantidadMedida * body.CostoUnitario) / body.Cantidad;
    nuevaCantidadInventarioTotal = (productToUpdate.CantidadInventario + body.Cantidad)
    costoFinal = ((body.Cantidad * costoEstandarizado)+(productToUpdate.CantidadInventario * productToUpdate.Costo))/nuevaCantidadInventarioTotal
    //console.log("Costo final: ", costoFinal);
  }else{
    costoEstandarizado = body.CostoUnitario/body.Cantidad;
    nuevaCantidadInventarioTotal = (productToUpdate.CantidadInventario + body.Cantidad);
    costoFinal = ((body.Cantidad * costoEstandarizado)+(productToUpdate.CantidadInventario * productToUpdate.Costo))/nuevaCantidadInventarioTotal
    //console.log("Costo final: ", costoFinal);
  }
  console.log("nuevaCantidadInvetario: ", nuevaCantidadInventarioTotal)
  console.log("Costo final: ", costoFinal)
  
  await product.doc(idproduct).set({
   "CantidadInventario": nuevaCantidadInventarioTotal, 
   "Costo": costoFinal
  }, { merge: true });
  res = await getProductById(idproduct);
  return res;
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
  updateProductPriceByMean
};
