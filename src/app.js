const express = require("express");
const cors = require("cors");
require("dotenv").config();
const apiRoutes = require("./routes");
const errorRoutes = require("./routes/errors.routes");
const initModels = require("./models/initModels");
const db = require('./utils/database');

initModels();
const app = express();

app.set("view engine", "ejs")
app.use(cors());
app.use(express.json(), express.static("assets"));

const PORT = process.env.PORT || 8000;

db.sync({ alter: true })
  .then(() => console.log('base de datos sincronizada'))
  .catch(err => console.log(err));



app.get("/", (req, res) => {
  res.render("home")
});

// agrupar todas las rutas en un archivo
apiRoutes(app);
errorRoutes(app);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Organizar los archivos para empezar con nuestros eps

// TODO les voy a dar las especificacones al estilo de una prueba tecnica

// instalar dbeaver??
