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

// Endpoint to update product cost and inventory by mean
app.put("/api/product/costInventoryByMean/:idproduct", async (req ,res) => {
  var idproduct = req.params.idproduct;
  var body = req.body;
  var respuesta = await fnProduct.updateProductPriceByMean(idproduct, body);
  res.send(respuesta);
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


//DeleteProduct
app.delete("/api/product/:idproduct", async (req, res) => {
  var productToDelete = req.params.idproduct;
  const response = await fnProduct.deleteProduct(productToDelete);
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
app.delete("/api/subsidiary/:id", async (req, res) => {
  const idEmp = req.params.id;
  const respuesta = await fnEmployee.deleteEmployee(idEmp);
  res.send(respuesta);
});



app.listen(4000, () => console.log("Up and Running on 4000"));
