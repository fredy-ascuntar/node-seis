const express = require("express");
const cors = require("cors");
const connection = require("./model/database");
const routeUsuario = require("./routes/routesUsuario").default;
const path = require("path");

class Server {
  constructor() {
    this.app = express();
    this.app.set("port", process.env.PORT || 4077);
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.static(path.join(__dirname, "..", "..", "FrontEnd")));

    this.app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "..", "..", "FrontEnd", "index.html"));
    });
    this.app.use(new routeUsuario().ruta);

    this.app.listen(process.env.PORT || 4077, () => {
      console.log("Corriendo en puerto " + process.env.PORT || 4077);
    });

    this.connectionBd;
  }

  async connectionBd() {
    await connection;
  }
}

const run = new Server();
