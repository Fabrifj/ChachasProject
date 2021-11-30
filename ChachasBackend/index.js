const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const fnSubsidiary = require("./subsidiary");
const fnMenu = require("./menu");
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


/*===================================
          CRUD MENU
===================================*/
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

app.listen(4000, () => console.log("Up and Running on 4000"));