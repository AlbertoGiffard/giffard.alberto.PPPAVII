require('./db/mongo');
const {PORT} = require("./utils/config");
const cors = require("cors");
const express = require('express');
const {handler404, logger, handlerError} = require('./utils/middlewares.js');
const mascotasRouter = require("./routes/mascotasRouter");
const usersRouter = require("./routes/usersRouter");
const loginRouter = require("./routes/loginRouter");


const app = express();

//middleware, que se encarga de procesar la peticion que tiene content-type application/json
app.use(express.json());
//para permitir el origen cruzado
app.use(cors());
//atrapa la peticion y luego sigue con el resto
app.use(logger);

app.get("/", (req, res) => {
    res.send("Api Mascotas");
});

app.use("/api/mascota", mascotasRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

//si manda cualquier url que no existe, responde esto
app.use(handler404);

app.use(handlerError);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http:localhost:${PORT}`);
});