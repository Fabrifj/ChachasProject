const { firebase, product } = require("./config");
const fnHerramientas = require("./herramientas");
const fnMenu = require("./menu");
const db = firebase.firestore();

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
async function createProductType(body, type) {
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
        console.log("Informacion del producto:", doc.data());
      } else {
        console.log("El producto no existe");
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

  // Get more information of products of type chachas.
  if (type == "Chacha") {
    for await (const product of list) {
      var idMenu = product.IdMenu;
      var menu = await fnMenu.getMenuId(idMenu);
      var image = menu.ImgURL;
      var name = menu.Nombre;

      product["ImgURL"] = image;
      product["Nombre"] = name;
    }
  }

  if (list.length == 0) {
    return null;
  } else {
    return list;
  }
}

//Get a list of products froma certain subsidiary
async function getProductSubsidiary(idSub) {
  const snapshot = await product.where("Origen", "==", idSub).get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  for await (const product of list) {
    if (product.Tipo == "Chacha") {
      var idMenu = product.IdMenu;
      var menu = await fnMenu.getMenuId(idMenu);
      var image = menu.ImgURL;
      var name = menu.Nombre;

      product["ImgURL"] = image;
      product["Nombre"] = name;
    }
  }
  return list;
}
/*
Generar un metodo para actualizar el costo de un producto
basandose en la media. (Tomar en cuenta cantidad y costo)
  Lo que nos pasan
    {
      "Costo":"",
      "IdProducto":"",
      "Cantidad":""
    }
*/

async function updateProductPriceByMean(idproduct, body) {
  var res = null;
  var costoFinal = 0;
  var costoEstandarizado = 0;
  var nuevaCantidadInventarioTotal = 0;
  var productToUpdate = await getProductById(idproduct); //product.doc(idproduct).get().data;
  console.log(productToUpdate);
  if (
    productToUpdate.Tipo == "InsumoSucursal" ||
    productToUpdate.Tipo == "InsumoFabrica"
  ) {
    costoEstandarizado =
      (productToUpdate.CantidadMedida * body.Costo) / body.Cantidad;
    nuevaCantidadInventarioTotal =
      productToUpdate.CantidadInventario + body.Cantidad;
    costoFinal =
      (body.Cantidad * costoEstandarizado +
        productToUpdate.CantidadInventario * productToUpdate.Costo) /
      nuevaCantidadInventarioTotal;
    //console.log("Costo final: ", costoFinal);
  } else {
    costoEstandarizado = body.Costo / body.Cantidad;
    nuevaCantidadInventarioTotal =
      productToUpdate.CantidadInventario + body.Cantidad;
    costoFinal =
      (body.Cantidad * costoEstandarizado +
        productToUpdate.CantidadInventario * productToUpdate.Costo) /
      nuevaCantidadInventarioTotal;
    //console.log("Costo final: ", costoFinal);
  }
  console.log("nuevaCantidadInvetario: ", nuevaCantidadInventarioTotal);
  console.log("Costo final: ", costoFinal);

  await product.doc(idproduct).set(
    {
      CantidadInventario: nuevaCantidadInventarioTotal,
      Costo: costoFinal,
    },
    { merge: true }
  );
  res = await getProductById(idproduct);
  return res;
}

//Update mermas of an product
/*
  {
    "Fecha":"",
    "Cantidad":""
  }
*/

//Update the information of mermas of a product
async function updateMermasProduct(idProd, body) {
  var respuesta = null;
  var date = fnHerramientas.stringAFecha(body.Fecha);
  body.Fecha = firebase.firestore.Timestamp.fromDate(new Date(date));
  var cantidadMermas = body.Cantidad;
  var cantidadInventario; 

  await product
    .doc(idProd)
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        var prodData = doc.data();
        cantidadInventario = prodData.CantidadInventario - cantidadMermas;
        if(cantidadInventario < 0){
          return "SIN STOCK DE CHACHAS";
        }

        if (prodData.Mermas) {
          await product.doc(idProd).update({
            Mermas: firebase.firestore.FieldValue.arrayUnion(body),
          });
          console.log("Merma information added correctly");
        } else {
          await product.doc(idProd).set({ Mermas: body }, { merge: true });
          console.log("Merma information added correctly");
        }

        await product.doc(idProd).set({CantidadInventario: cantidadInventario}, {merge:true});
        respuesta = await getProductById(idProd);
      } else {
        console.log("The product does not exist");
      }
    });

  return respuesta;
}

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

/**
 * 
 * @param {string} idProducto 
 * @param 
 * {
      Gasto:1000
 * } body Gasto hace referencia a cuanto se gasto de ese producto, segun como ese producto esta medido.
 */
async function updateExpenseSupplySubsidiary(idProducto, body) {
  const expense = parseFloat(body.Gasto);
  const miProd = await fnHerramientas.getDoc(idProducto, "Producto");
  const upd = {
    CantidadInventario: parseFloat(miProd.CantidadInventario) - expense,
  };
  var resp = null;
  if (upd.CantidadInventario >= 0) {
    resp = await fnHerramientas.updateDoc(idProducto, upd, "Producto");
  } else return "No existe cantidad necesaria para ese gasto";
}
async function getProductTransaction(idMenu, IdOrigen) {
  var miDoc = null;
  console.log("entra a la funcion con: ", idMenu, IdOrigen);
  var productos = await getAllProducts();
  var resultado = null;

  productos.forEach(async (producto) => {
    //console.log(producto.Origen);
    if (
      producto.Origen == IdOrigen &&
      producto.IdMenu == idMenu &&
      producto.Tipo == "Chacha"
    ) {
      resultado = producto;
    }
  });

  //var resultado = productos.filter(elem => elem.Tipo == "Chacha" && elem.Origen == IdOrigen && elem.IdMenu == idMenu);
  console.log("El producto", resultado);

  return resultado;
}

async function getMermasProd(idProd){
  var resp = null;
  await product
    .doc(idProd)
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        var prodData = doc.data();
        
        if (prodData.Tipo == "Chacha" && prodData.Mermas) {
          var menu = await fnMenu.getMenuId(prodData.IdMenu);
          resp = {
            "Nombre": menu.Nombre,
            "Mermas": prodData.Mermas,
            "Sucursal": prodData.Origen
          }
          console.log("The product have mermas");
        } else {
          console.log("The product does not have information of mermas");
        }
      } else {
        console.log("The product does not exist");
      }
    }); 
  return resp;
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
  updateProductPriceByMean,
  createProductType,
  updateMermasProduct,
  updateExpenseSupplySubsidiary,
  getProductTransaction,
  getMermaSubsidiary,
  getMermasProd
};
