import express from "express";
import { RepositorioSubastasEnMemoria } from "./infrastructure/persistence/RepositorioSubastasEnMemoria.js";
import { crearRutasSubastas } from "./infrastructure/http/rutasSubastas.js";

const app = express();
app.use(express.json());

const repositorioSubastas = new RepositorioSubastasEnMemoria();

app.use("/subastas", crearRutasSubastas(repositorioSubastas));

const PUERTO = process.env.PORT ?? 3000;

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});