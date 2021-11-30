const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

const fnOrder = require("./order");
const fnProduct = require("./product");
const fnSubsidiary = require("./subsidiary");

// CRUD Product
//Get
app.get("/api/product", async (req, res) => {
  const products = await fnProduct.getAllProducts();
  res.send(products);
});

app.post("/api/product", async (req, res) => {
  var newproduct = req.body;
  const response = await fnProduct.createProduct(newproduct);
  res.send(response);
});

app.delete("/api/product/:idproduct", async (req, res) => {
  var productToDelete = req.params.idproduct;
  const response = await fnProduct.deleteProduct(productToDelete);
  res.send(response);
});

app.put("/api/product/:idproduct", async (req, res) => {
  var productToUpdate = req.params.idproduct;
  var body = req.body;
  const response = await fnProduct.updateProduct(productToUpdate, body);
  res.send(response);
});

app.get("/api/product/:idproduct", async (req, res) => {
  var productToGet = req.params.idproduct;
  const response = await fnProduct.getProductById(productToGet);
  res.send(response);
});

app.put("/api/product/:idproduct", async (req, res) => {
  var productToUpdate = req.params.idproduct;
  var body = req.body;
  var quantity = parseInt(body.CantidadInventario, 10);
  const response = await fnProduct.updateProductAfterSale(
    productToUpdate,
    quantity
  );
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

// CRUD Orders

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

/*===================================
          CRUD SUBSIDIARY
===================================*/
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

app.listen(4000, () => console.log("Up and Running on 4000"));
