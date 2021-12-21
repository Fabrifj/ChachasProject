const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

const fnOrder = require("./order");
const fnProduct = require("./product");
const fnSubsidiary = require("./subsidiary");
const fnMenu = require("./menu");
const fnEmployee = require("./employee");
const fnPurchase = require("./purchase");
const fnHerramientas = require("./herramientas");
const fnTransaction = require("./transaction");
const fnMerma = require("./merma");
const fnIngredient = require('./ingredient');
const fnRegister = require('./register');

/*=================================
          CRUD PRODUCT
==================================*/

//GetAllProducts
app.get("/api/product", async (req, res) => {
  const products = await fnProduct.getAllProducts();
  res.send(products);
});

//Get a product by its ID
app.get("/api/product/:idproduct", async (req, res) => {
  var productToGet = req.params.idproduct;
  const response = await fnProduct.getProductById(productToGet);
  res.send(response);
});

// Endpoint to get all the products of one type of one specific subsidiary
app.get("/api/product/subsidiary/:idSub/type/:type", async (req, res) => {
  var idSub = req.params.idSub;
  var type = req.params.type;
  const response = await fnProduct.getProductSubsidiaryType(idSub, type);
  res.send(response);
});

//Get all products in subsidiary
app.get("/api/product/subsidiary/:idSub", async (req, res) => {
  var idSub = req.params.idSub;
  const response = await fnProduct.getProductSubsidiary(idSub);
  res.send(response);
});

//Endpoint to get all the products of type "Chacha" and "Refresco"
app.get("/api/product/ChachaRefresco/:idSub", async (req ,res) => {
  var idSub = req.params.idSub;
  var respuesta;
  var chachas = await fnProduct.getProductSubsidiaryType(idSub, "Chacha");
  var refrescos = await fnProduct.getProductSubsidiaryType(idSub, "Refresco");
  if (chachas == null || refrescos == null){
    respuesta = null;
  }else{
    respuesta = chachas.concat(refrescos);
  }
  res.send(respuesta);
});

//Endpoint to get all the products of type "Chacha" and "InsumoFabrica" and Subsidiary info
app.get("/api/product/ChachaInsumo/:idSub", async (req ,res) => {
  var idSub = req.params.idSub;
  var respuesta;
  var chachas = await fnProduct.getProductSubsidiaryType(idSub, "Chacha");
  var insumos = await fnProduct.getProductSubsidiaryType(idSub, "InsumoFabrica");
  var sucursalInfo = await fnSubsidiary.getSubsidiary(idSub);
  if (chachas == null || insumos == null || sucursalInfo == null){
    respuesta = null;
  }else{
    respuesta = (chachas.concat(insumos)).concat(sucursalInfo);
  }
  res.send(respuesta);
});

// Endpoints to get the inventory of a Sucursal (Chachas and Salsas)
app.get("/api/product/inventory/:idSub", async (req ,res) => {
  var idSub = req.params.idSub;
  var respuesta = null;
  var chachas = await fnProduct.getProductSubsidiaryType(idSub, "Chacha");
  var insumos = await fnProduct.getProductSubsidiaryType(idSub, "InsumoFabrica");
  if (chachas != null && insumos != null){
    respuesta = chachas.concat(insumos);
  }
  res.send(respuesta);
});

// Get the transation of a product
app.get("/api/productTransaction", async (req, res) => {
  var body = req.body;
  console.log("entra a la busqueda de transaction product");
  const prod = await fnProduct.getProductTransaction(body.IdMenu,body.Origen);
  res.send(prod);
});

// Get the mermas of a product
app.get("/api/product/mermas/:idProd", async (req, res) => {
  var idProd = req.params.idProd;
  const response = await fnProduct.getMermasProd(idProd);
  res.send(response);
});


//Create generic product
app.post("/api/product", async (req, res) => {
  var newproduct = req.body;
  const response = await fnProduct.createProduct(newproduct);
  res.send(response);
});

//Create product of type Chacha
app.post("/api/productChacha", async (req, res) => {
  var type = "Chacha"
  var body = req.body;
  const response = await fnProduct.createProductType(body, type);
  res.send(response);
});

//Create product of type Refresco
app.post("/api/productRefresco", async (req, res) => {
  var type = "Refresco"
  var body = req.body;
  const response = await fnProduct.createProductType(body, type);
  res.send(response);
});

//Create product of type InsumoSucursal
app.post("/api/productInsumoSucursal", async (req, res) => {
  var type = "InsumoSucursal"
  var body = req.body;
  const response = await fnProduct.createProductType(body, type);
  res.send(response);
});

//Create product of type InsumoFabrica
app.post("/api/productInsumoFabrica", async (req, res) => {
  var type = "InsumoFabrica"
  var body = req.body;
  const response = await fnProduct.createProductType(body, type);
  res.send(response);
});


//UpdateProduct
app.put("/api/product/:idproduct", async (req, res) => {
  var productToUpdate = req.params.idproduct;
  var body = req.body;
  const response = await fnProduct.updateProduct(productToUpdate, body);
  res.send(response);
});

//Update product's attributes after a sale
app.put("/api/product/afterSale/:idproduct", async (req, res) => {
  var productToUpdate = req.params.idproduct;
  var body = req.body;
  var quantity = parseInt(body.CantidadInventario, 10);
  const response = await fnProduct.updateProductAfterSale(
    productToUpdate,
    quantity
  );
  res.send(response);
});

//Update Mermas of a product of type chachas
app.put("/api/product/mermas/:idproduct", async (req, res) => {
  var idProd = req.params.idproduct;
  var body = req.body;
  const response = await fnProduct.updateMermasProduct(idProd, body);
  res.send(response);
});

// Endpoint to update product cost and inventory by mean
app.put("/api/product/costInventoryByMean/:idproduct", async (req ,res) => {
  var idproduct = req.params.idproduct;
  var body = req.body;
  var respuesta = await fnProduct.updateProductPriceByMean(idproduct, body);
  res.send(respuesta);
});

//Update CantidadInventario of a product giving it's expense (spent quantity)
app.put("/api/product/expense/:idproduct", async (req, res) => {
  var idProd = req.params.idproduct;
  var body = req.body;
  const response = await fnProduct.updateExpenseSupplySubsidiary(idProd, body);
  res.send(response);
});

//DeleteProduct
app.delete("/api/product/:idproduct", async (req, res) => {
  var productToDelete = req.params.idproduct;
  const response = await fnProduct.deleteProduct(productToDelete);
  res.send(response);
});
//Create Product Factory
app.post("/api/productFactory", async (req, res) => {
  const body = req.body;
  const response = await fnProduct.createProductFactory(body);
  res.send(response);
});
//Update Product Factory
app.put("/api/productFactory/:idproduct", async (req, res) => {
  const body = req.body;
  const idProd = req.params.idproduct;
  const response = await fnProduct.updateProductFactory(idProd,body);
  res.send(response);
});

//Get products fabrica with ingredients
app.get("/api/products", async (req, res) => {
  const response = await fnProduct.getProductsFabrica();
  res.send(response);
});

//Get Salsas fabrica with ingredients
app.get("/api/products/salsas", async (req, res) => {
  const response = await fnProduct.getSalsasFabrica();
  res.send(response);
});

//Get chachas fabrica with ingredients
app.get("/api/products/chachas", async (req, res) => {
  const response = await fnProduct.getChachasFabrica();
  res.send(response);
});

// Create Product-Salsa with ingredients (id's) and cantidadMedida
app.post("/api/product/salsa/", async (req, res) => {
  var newSalsa = req.body;
  const response = await fnProduct.createProductSalsaRecetaInformacion(newSalsa);
  res.send(response);
});

/*=================================
          CRUD ORDER
==================================*/

//Get all orders
app.get("/api/order", async (req, res) => {
  const orders = await fnOrder.getAllOrders();
  res.send(orders);
});

//Create order
app.post("/api/order", async (req, res) => {
  var newOrder = req.body;
  const response = await fnOrder.createOrder(newOrder);
  res.send(response);
});

//Delete order
app.delete("/api/order/:idOrder", async (req, res) => {
  var orderToDelete = req.params.idOrder;
  const response = await fnOrder.deleteOrder(orderToDelete);
  res.send(response);
});


/*================================
          CRUD SUBSIDIARY
==================================*/

// Create Subsidiary
app.post("/api/subsidiary", async (req, res) => {
  var body = req.body;
  const respuesta = await fnSubsidiary.createSubsidiary(body);
  res.send(respuesta);
});

// Get Subsidiaries
app.get("/api/subsidiary", async (req, res) => {
  const respuesta = await fnSubsidiary.getSubsidiaries();
  res.send(respuesta);
});
//Get Subsidiary by Id
app.get("/api/subsidiary/:id", async (req, res) => {
  const idSubsidiary = req.params.id;
  const respuesta = await fnSubsidiary.getSubsidiary(idSubsidiary);
  res.send(respuesta);
});
//Update Subsidiary
app.put("/api/subsidiary/:id", async (req, res) => {
  const body = req.body;
  const idSubsidiary = req.params.id;
  const respuesta = await fnSubsidiary.updateSubsidiary(idSubsidiary, body);
  res.send(respuesta);
});

//Delete Subsidiary
app.delete("/api/subsidiary/:id", async (req, res) => {
  const idSubsidiary = req.params.id;
  const respuesta = await fnSubsidiary.deleteSubsidiary(idSubsidiary);
  res.send(respuesta);
});

//get mermas from subsidiary
app.get("/api/subsidiaryMermas/:id", async (req, res) => {
  console.log('hi')
  const idSubsidiary = req.params.id;
  const respuesta = await fnProduct.getMermaSubsidiary(idSubsidiary);
  res.send(respuesta);
});

/*===================================
          CRUD MENU
==================================*/
// Create Menu
app.post("/api/menu", async (req, res) => {
  var body = req.body;
  const respuesta = await fnMenu.createMenu(body);
  res.send(respuesta);
});

// Get Menus
app.get("/api/menu", async (req, res) => {
  const respuesta = await fnMenu.getMenus();
  res.send(respuesta);
});

//Get Menu by Name
app.get("/api/menu/getMenuName", async (req, res) => {
  var body = req.body;
  var respuesta = await fnMenu.getMenuName(body);
  res.send(respuesta);
});

//Update Menu
app.put("/api/menu/:id", async (req, res) => {
  var menid = req.params.id;
  var men = req.body;
  const respuesta = await fnMenu.updateMenu(menid,men);
  res.send(respuesta);
});

//Delete Menu by id
app.delete("/api/menu/:id", async (req, res) => {
  var men = req.params.id;
  const resp = await fnMenu.deleteMenu(men);
  res.send(resp);
});

/*===================================
          CRUD EMPLOYEE
==================================*/
// Create Employee
app.post("/api/employee", async (req, res) => {
  var body = req.body;
  const respuesta = await fnEmployee.createEmployee(body);
  res.send(respuesta);
});

// Get Employees
app.get("/api/employee", async (req, res) => {
  const respuesta = await fnEmployee.getEmployees();
  res.send(respuesta);
});
//Get Employee by Id
app.get("/api/employee/:id", async (req, res) => {
  const idEmp = req.params.id;
  const respuesta = await fnEmployee.getEmployee(idEmp);
  res.send(respuesta);
});

//Get Employees by Domain
app.get("/api/employee/domain/:id", async (req, res) => {
  const id = req.params.id;
  const respuesta = await fnEmployee.getEmployeesByDomain(id);
  res.send(respuesta);
});


//Update Employee
app.put("/api/employee/:id", async (req, res) => {
  const body = req.body;
  const idEmp = req.params.id;
  const respuesta = await fnEmployee.updateEmployee(idEmp, body);
  res.send(respuesta);
});
//Change Password Employee
app.put("/api/employee", async (req, res) => {
  const body = req.body;
  const respuesta = await fnEmployee.updatePassword(body);
  res.send(respuesta);
});
//Delete Employee
app.delete("/api/employee/:id", async (req, res) => {
  const idEmp = req.params.id;
  const respuesta = await fnEmployee.deleteEmployee(idEmp);
  res.send(respuesta);
});

//Authenticate employee
app.get("/api/employee/username/:username/pass/:pass", async (req, res) => {
  const username = req.params.username;
  const pass = req.params.pass;
  const resp = await fnEmployee.authenticateEmployee(username, pass);
  res.send(resp);
});

// Get Entity by employee username and pass
app.get("/api/employee/entity/username/:username/pass/:pass", async (req, res) => {
  const username = req.params.username;
  const pass = req.params.pass
  const respuesta = await fnEmployee.getEntityByEmployeeUserAndPass(username, pass);
  res.send(respuesta);
});

/*===================================
          CRUD PURCHASE
===================================*/
// Create Purchase
app.post("/api/purchase", async (req, res) => {
  var body = req.body;
  const respuesta = await fnPurchase.createPurchase(body);
  res.send(respuesta);
});

// Get Purchase
app.get("/api/purchase", async (req, res) => {
  const respuesta = await fnPurchase.getPurchases();
  res.send(respuesta);
});
//Get Purchase by Id
app.get("/api/purchase/:id", async (req, res) => {
  const idPur = req.params.id;
  const respuesta = await fnPurchase.getPurchase(idPur);
  res.send(respuesta);
});
//Update Purchase
app.put("/api/purchase/:id", async (req, res) => {
  const body = req.body;
  const idPur = req.params.id;
  const respuesta = await fnPurchase.updatePurchase(idPur, body);
  res.send(respuesta);
});
/*===================================
          CRUD TRANSACTION
===================================*/
// Create Transaccion
app.post("/api/transaction", async (req, res) => {
  var body = req.body;
  const respuesta = await fnTransaction.createTransaction(body);
  res.send(respuesta);
});

// Get Transaction
app.get("/api/transaction", async (req, res) => {
  const respuesta = await fnTransaction.getTransactions();
  res.send(respuesta);
});
//Get Transaction by Id
app.get("/api/transaction/:id", async (req, res) => {
  const idEmp = req.params.id;
  const respuesta = await fnTransaction.getTransaction(idEmp);
  res.send(respuesta);
});
//Update Transaction
app.put("/api/transaction/:id", async (req, res) => {
  const body = req.body;
  const idEmp = req.params.id;
  const respuesta = await fnTransaction.updateTransaction(idEmp, body);
  res.send(respuesta);
});
//Delete Transaction
app.delete("/api/transaction/:id", async (req, res) => {
  const idEmp = req.params.id;
  const respuesta = await fnTransaction.deleteTransaction(idEmp);
  res.send(respuesta);
});



//Delete Purchase
app.delete("/api/subsidiary/:id", async (req, res) => {
  const idPur = req.params.id;
  const respuesta = await fnPurchase.deletePurchase(idPur);
  res.send(respuesta);
});

/*================================
          CRUD MERMA
==================================*/

// Create Merma
app.post("/api/merma", async (req, res) => {
  var body = req.body;
  const respuesta = await fnMerma.createMerma(body);
  res.send(respuesta);
});

// Get Mermas
app.get("/api/merma", async (req, res) => {
  const respuesta = await fnMerma.getMermas();
  res.send(respuesta);
});
//Get Merma by Id
app.get("/api/merma/:id", async (req, res) => {
  const idMerma = req.params.id;
  const respuesta = await fnMerma.getMerma(idMerma);
  res.send(respuesta);
});
//Update Merma
app.put("/api/merma/:id", async (req, res) => {
  const body = req.body;
  const idMerma = req.params.id;
  const respuesta = await fnMerma.updateMerma(idMerma, body);
  res.send(respuesta);
});

//Delete Merma
app.delete("/api/merma/:id", async (req, res) => {
  const idMerma = req.params.id;
  const respuesta = await fnMerma.deleteMerma(idMerma);
});
/*===================================
          CRUD INGREDIENT
===================================*/

//Create ingredient info
app.post("/api/ingredientInfo", async (req, res) => {
  var newIngredient = req.body;
  const response = await fnIngredient.createIngredientInfo(newIngredient);
  res.send(response);
});

// Get all ingredients
app.get("/api/ingredient", async (req, res) => {
  const respuesta = await fnIngredient.getIngredients();
  res.send(respuesta);
});

//Get ingredient by Id
app.get("/api/ingredient/:id", async (req, res) => {
  const idIn = req.params.id;
  const respuesta = await fnIngredient.getIngredient(idIn);
  res.send(respuesta);
});

//Update Ingredient
app.put("/api/ingredient/:id", async (req, res) => {
  const body = req.body;
  const idIn = req.params.id;
  const respuesta = await fnIngredient.updateIngredient(idIn, body);
  res.send(respuesta);
});
//Delete Transaction
app.delete("/api/ingredient/:id", async (req, res) => {
  const idIn = req.params.id;
  const respuesta = await fnIngredient.deleteIngredient(idIn);
  res.send(respuesta);
});


/*===================================
          CRUD REGISTER
===================================*/

//Create register document of type cuenta
app.post("/api/register/cuenta", async (req, res) => {
  var body = req.body;
  const response = await fnRegister.createRegisterCuenta(body);
  res.send(response);
});

//Create register document of type ingreso or egreso
app.post("/api/register/ingreso_egreso", async (req, res) => {
  var body = req.body;
  const response = await fnRegister.createRegisterIngresoEgreso(body);
  res.send(response);
});

// Get all the registers of type cuenta
app.get("/api/register/cuenta", async (req, res) => {
  const response = await fnRegister.getRegisterCuentas();
  res.send(response);
});

// Get Cuenta by Date
app.get("/api/register/cuenta/:date", async (req, res) => {
  const date = req.params.date;
  const response = await fnRegister.getCuentaByDate(date);
  res.send(response);
});

// Get a register by ID
app.get("/api/register/:id", async (req, res) => {
  const id = req.params.id;
  const response = await fnRegister.getRegisterByID(id);
  res.send(response);
});

// Get a register Cuenta by Subsidiary
app.get("/api/register/cuenta/subsidiary/:idSub", async (req, res) => {
  const idSub = req.params.idSub;
  const response = await fnRegister.getRegisterCuentaBySubsidiary(idSub);
  res.send(response);
});


//Update Cuenta
app.put("/api/register/cuenta/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const respuesta = await fnRegister.updateRegisterCuenta(id, body);
  res.send(respuesta);
});

//Delete Register
app.delete("/api/register/:id", async (req, res) => {
  const id = req.params.id;
  const respuesta = await fnRegister.deleteRegister(id);
  res.send(respuesta);
});


/*===================================
          CRUD REGISTER
===================================*/
app.get("/api/prueba", async (req, res) => {
  const response = await fnHerramientas.getDoc("1GQcA1ELZufELjBGbgoo","Producto");
  res.send(response);
});






app.listen(4000, () => console.log("Up and Running on 4000"));
