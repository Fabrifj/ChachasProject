const { firebase, product, menu } = require("./config");
const fnHerramientas = require("./herramientas");
const fnMenu = require("./menu");
const fnIngredient = require('./ingredient');
const fnSubsidiary = require("./subsidiary");
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
  res = null;
  body.Tipo = type;
  body.Costo = 0;
  await product
    .add(body)
    .then((doc) => {
      console.log("Product added");
      res = body;
    })
    .catch((error) => {
      console.log("Product not created");
    });

  return res;
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
  console.log(list);
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
  var productToUpdate = await fnHerramientas.getDoc(idproduct,"Producto"); //product.doc(idproduct).get().data;
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
  res = await fnHerramientas.getDoc(idproduct,"Producto"); 
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
        if (cantidadInventario < 0) {
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

        await product
          .doc(idProd)
          .set({ CantidadInventario: cantidadInventario }, { merge: true });
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
  await product
    .where("Origen", "==", idSub)
    .get()
    .then((snapshot) => {
      list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      for (i in list) {
        if (list[i].Mermas) {
          for (j in list[i].Mermas) {
            list[i].Mermas[j].Fecha =
              list[i].Mermas[j].Fecha.toDate().toDateString();
            result.push(list[i].Mermas[j]);
          }
        }
      }
    })
    .catch((error) => {
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

product.where("Origen", "==", "mAlmWL1myFMGbZW8WHw3").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    //console.log(change.doc.data().CantidadInventario);
    if (
      change.doc.data().CantidadMinima > change.doc.data().CantidadInventario
    ) {
      console.log(`EL PRODUCTO PASO EL MINIMO ${change.doc.id}`);
    }
  });
});

async function getMermasProd(idProd) {
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
            Nombre: menu.Nombre,
            Mermas: prodData.Mermas,
            Sucursal: prodData.Origen,
          };
          console.log("Tthe product have mermas");
        } else {
          console.log("The product does not have information of mermas");
        }
      } else {
        console.log("The product does not exist");
      }
    });
  return resp;
}

/**
 * 
 * @param {*} idProd 
 * @param 
{
	"Nombre" : "Chacha de carne",
	"TipoUnidad:"kg",
  "ImgURL":,
	"CantidadMinima":,
	"ListaIngredientes":[
		{
			"IdIngrediente":"",
			"Cantidad": , 
			"TipoUnidad" :  
		}
		
	]
	

} body 
 */

async function createProductFactory(body) {
  body = await checkMenu(body, null);
  const calculo = await calculateCostChachaFactory(body.ListaIngredientes);
  body.ListaIngredientes = calculo.ListaIngredientes;
  body.Costo = calculo.Costo;
  body.CantidadInventario = 0;
  body.Origen = "Fabrica";
  body.Tipo = "Chacha";
  //console.log("ChachaCompleta: ",body);
  fnHerramientas.createDoc(body, "Producto");
  return body;
}

//Get a list of products with ingredients
async function getProductsFabrica() {
  const snapshot = await product.orderBy("ListaIngredientes").get();
  const list = snapshot.docs.map((doc) => ({
    ListaIngredientes: doc.Receta,
    Id:doc.id,
    ...doc.data(),
  }));
  for (i in list) {
    if (list[i].IdMenu) {
      menuItem = await fnMenu.getMenuId(list[i].IdMenu);
      list[i].Nombre = menuItem.Nombre;
      list[i].ImgURL = menuItem.ImgURL;
    }
  }

  if (list.length == 0) {
    return null;
  } else {
    return list;
  }
}

//Get a list of Salsas with ingredients
async function getSalsasFabrica() {
  var list = await getProductsFabrica(); 
  list = list.filter(filterByName)
  function filterByName(item){
    if (item.Nombre && item.Nombre.includes("Salsa")){
      return true;
    }
  } 
  
  if (list.length == 0) {
    return null;
  } else {
    return list;
  }
}

//Get a list of Chachas with ingredients
async function getChachasFabrica() {
  var list = await getProductsFabrica();
  list = list.filter(filterByName)
  function filterByName(item){
    if (item.Nombre && item.Nombre.includes("Chacha")){
      return true;
    }
  } 
  
  if (list.length == 0) {
    return null;
  } else {
    return list;
  }
}

/**
 * 
 * @param 
{


	"Nombre" : "Chacha de carne",
	"TipoUnidad:"Kg.",
  "ImgURL":"",
  "IdMenu":"jbibohiboihbo",
	"Precio": 5,
	"CantidadMinima":5,
	"ListaIngredientes":[
		{
			"Nombre":"",
			"Cantidad": , 
			"TipoUnidad" :  
		}
		
	]
	
	
} body 
 */
async function updateProductFactory(idProd, body) {
  
  if (body.hasOwnProperty("ListaIngredientes")) {
    const calculo = await calculateCostChachaFactory(body.ListaIngredientes);
    body.ListaIngredientes = calculo.ListaIngredientes;
    body.Costo = calculo.Costo;
  }
  body = await checkMenu(body, idProd);
  return await fnHerramientas.updateDoc(idProd, body, "Producto");
}
async function checkMenu(body, idProd) {
  if (body.hasOwnProperty("Nombre")) {
    const myMenu = await fnMenu.getMenuName({ Nombre: body.Nombre });
    const upd = {
      Nombre: body.Nombre,
    };
    if (myMenu != null && myMenu.length > 0) {
      body.IdMenu = myMenu[0].id;
      console.log("MY MENU:", myMenu[0].id);
      await fnHerramientas.updateDoc(myMenu[0].id, upd, "Menu");
    } else {
      const res = await fnHerramientas.createDoc(upd, "Menu");
      console.log("SE CREA NUEVO MENU");
      body.IdMenu = res.id;
    }
    delete body.Nombre;
  }
  if (body.hasOwnProperty("ImgURL")) {
    if (body.hasOwnProperty("IdMenu")) {
      await fnMenu.updateMenu(body.IdMenu, { ImgURL: body.ImgURL });
    } else {
      if (idProd != null) {
        const myProd = await fnHerramientas.getDoc(idProd, "Producto");
        await fnMenu.updateMenu(myProd.IdMenu, { ImgURL: body.ImgURL });
      }
    }
    delete body.ImgURL;
  }
  return body;
}

async function calculateCostChachaFactory(listaIngredientes) {
  var costoTot = 0;
  for await (const ing of listaIngredientes) {
    const myIng = await fnHerramientas.getDoc(ing.IdIngrediente, "Ingrediente");
    ing.Nombre = myIng.Nombre;
    ing.CantidadMedida = ing.Cantidad;
    console.log("Cantidad", ing.Cantidad, ing.CantidadMedida);
    delete ing.Cantidad;
    console.log("Cantidad Medida", ing.CantidadMedida);
    
    ing.Costo =
      parseFloat(ing.CantidadMedida) *
      (parseFloat(myIng.CostoMedio) / parseFloat(myIng.CantidadMedida));
    costoTot += ing.Costo;
  }
  console.log("ListaIngredientes: ",listaIngredientes);
  return { Costo: costoTot, ListaIngredientes: listaIngredientes };
}

async function calculateCostSalsaFactory(listaIngredientes) {
  var costoTot = 0;
  for await (const ing of listaIngredientes) {
    const myIng = await fnHerramientas.getDoc(ing.IdIngrediente, "Ingrediente");
    //console.log("Procesando", myIng);
    ing.Nombre = myIng.Nombre;
    //delete ing.CantidadMedida;
    ing.Costo =
      parseFloat(ing.CantidadMedida) *
      parseFloat(myIng.CostoMedio);
    costoTot += ing.Costo;
    console.log("Costo", ing.Costo);
  }
  return { Costo: costoTot, ListaIngredientes: listaIngredientes };
}

/*
{
"TipoOrigen": "Fabrica",
"Nombre" : "salsa cebolla pollo y res",
"CantidadMedida": 50, 
"CantidadInventario": 0,
"CantidadMinima": 100,
"TipoUnidad": "ml",
"ListaIngredientes":[
    {
      "IdIngrediente": "1yFlLhTcIoYj6t18S6Qt",
      "CantidadMedida": 0.5
    },
    {
      "IdIngrediente": "sofwzoZRrv7lRgnp8F5X",
      "CantidadMedida": 0.25
    },
	  {
			"IdIngrediente": "OPbb9e3SOlXffrSxBiHx",
      "CantidadMedida": 0.15
		}
  ]
}
*/
// Create product salsa receta informacion
async function createProductSalsaRecetaInformacion(body) {
  var res = null;
  const calculo = await calculateCostSalsaFactory(body.ListaIngredientes);
  res = { TipoOrigen: body.TipoOrigen, Nombre: body.Nombre, 
    CantidadMedida: body.CantidadMedida, CantidadInventario: body.CantidadInventario,
    CantidadMinima: body.CantidadMinima, Costo: calculo.Costo, TipoUnidad: body.TipoUnidad,
    ListaIngredientes: calculo.ListaIngredientes};
  console.log(res);
  await product.add(res);
  
  return res;
}

/*
Para que anote:

{
	"TipoOrigen": "Fabrica",
	"Nombre": "salsa cebolla pollo y res",
	"CantidadMedida": 50,
	"CantidadInventario": 0,
	"CantidadMinima": 100,
	"Costo": 8.226190476190476,
	"TipoUnidad": "ml",
	"ListaIngredientes": [
		{
			"IdIngrediente": "1yFlLhTcIoYj6t18S6Qt",
			"CantidadMedida": 0.5,
			"Nombre": "Cebolla",
			"Costo": 1.5833333333333333
		},
		{
			"IdIngrediente": "sofwzoZRrv7lRgnp8F5X",
			"CantidadMedida": 0.25,
			"Nombre": "Carne de Res",
			"Costo": 5
		},
		{
			"IdIngrediente": "OPbb9e3SOlXffrSxBiHx",
			"CantidadMedida": 0.15,
			"Nombre": "Carne de pollo molida",
			"Costo": 1.6428571428571428
		}
	]
}
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
// Aux function for makeProductProductChacha 
async function calculateInventoryForMenuAndIngredientes(listaIngredientes, cantidadRealizada) {
  var res = null;
  for await (const ing of listaIngredientes) {
    const myIng = await fnHerramientas.getDoc(ing.IdIngrediente, "Ingrediente");
    myIng.CantidadInventario =
    parseFloat(myIng.CantidadInventario) - (parseFloat(cantidadRealizada)*parseFloat(ing.CantidadMedida));
    console.log("Nueva Cantidad Inventario", myIng.CantidadInventario);

    var ingActualizado = { CantidadInventario: myIng.CantidadInventario, CantidadMedida: myIng.CantidadMedida,
      CantidadMinima: myIng.CantidadMinima, CostoMedio: myIng.CostoMedio, Id: myIng.Id, Nombre: myIng.Nombre, TipoUnidad: myIng.TipoUnidad
    };
    fnHerramientas.updateDoc(myIng.Id, ingActualizado, "Ingrediente");
    console.log("Nuevo ingrediente actualizado:", myIng);
    //res = res.concat(ing.CantidadInventario);
  }
  return res;
}

/*
Pasamos a path: http://localhost:4000/api/product/menu/W3jHvAlBEfA9yEkyzvol
lo siguiente:
{
	"CantidadRealizada":5,
}
Se actualiza cada Ingrediente que se necesita para hacer la Chacha y tambien la CantidadInventario de este producto
*/
// Make Product Chacha with idProduct
async function makeProductProductChacha(idproduct, body) {
  var res = null;
  const productoAux = await fnHerramientas.getDoc(idproduct, "Producto");
  calculateInventoryForMenuAndIngredientes(productoAux.ListaIngredientes, body.CantidadRealizada);
  productoAux.CantidadInventario = productoAux.CantidadInventario + body.CantidadRealizada;
  fnHerramientas.updateDoc(idproduct, productoAux, "Producto")
  return productoAux;
}

// Create reservation of product of Factory "Salsa"
/* 
{
  idProducto: (id de alguna salsa),
  cantidadReserva: 200
  tipoUnidad: ???ml???
} 
 */


async function updateReservationSalsa(body){
  var res = null; 

  //Body parameters
  var id = body.idProducto;
  var cantidadReserva = body.cantidadReserva;
  var tipoUnidadReserva = body.tipoUnidad;

  //Get the salsa
  var salsa = await getProductById(id);
  
  if (salsa.Tipo == "Salsa"){
    console.log("\n\nProduct of type Salsa\n")
    var cantidadMedida = salsa.CantidadMedida;
    var cantidadInventario = salsa.CantidadInventario;

    // Calculate the ratio
    if(salsa.TipoUnidad == tipoUnidadReserva){
      console.log("Metrics match");
      var ratio = cantidadReserva / cantidadMedida;
      console.log("The ratio is: ", ratio);

      var listaIng = salsa.ListaIngredientes
      console.log(listaIng);
      console.log("=============================");

      for await (const ing of listaIng) {
        var idIng = ing.IdIngrediente;
        var ingredient = await fnIngredient.getIngredient(idIng);
        var newCantInvIng = ingredient.CantidadInventario - (ing.CantidadMedida * ratio);
        console.log("NewCantidadInventario of the ingredient", newCantInvIng);

        //Update the ingredient
        fnIngredient.updateIngredient(idIng, {"CantidadInventario":newCantInvIng});
      }

      console.log("=============================");

      //Update the CantidadInvetario of the Salsa
      cantidadInventario += cantidadReserva;
      console.log("NewCantidadInventario of the salsa: ", cantidadInventario);

      //Update the product salsa
      await product.doc(id).set(
        {
          "CantidadInventario": cantidadInventario
        },
        { merge: true }
      );
      
      res = await getProductById(id);
    }else{
      console.log("Mismatch in field Tipo Unidad");
      return res;
    }
  }
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
  updateProductPriceByMean,
  createProductType,
  updateMermasProduct,
  updateExpenseSupplySubsidiary,
  getProductTransaction,
  getMermaSubsidiary,
  getMermasProd,
  getProductsFabrica,
  createProductFactory,
  calculateCostChachaFactory,
  calculateCostSalsaFactory,
  updateProductFactory,
  getChachasFabrica,
  getSalsasFabrica,
  createProductSalsaRecetaInformacion,
  updateReservationSalsa,
  makeProductProductChacha

};
