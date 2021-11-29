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

app.listen(4000, () => console.log("Up and Running on 4000"));