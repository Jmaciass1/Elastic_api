const express = require("express");
const searchRoutes = require("./routes/search.routes");
const indexRoutes = require("./routes/index.routes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Elasticsearch API está corriendo.");
});

// Rutas para búsquedas
app.use("/api/search", searchRoutes);

// Rutas para indexación
app.use("/api/index", indexRoutes)

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).send("Ruta no encontrada.");
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error interno del servidor.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
