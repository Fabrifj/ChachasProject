const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const fnSubsidiary = require("./subsidiary");
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