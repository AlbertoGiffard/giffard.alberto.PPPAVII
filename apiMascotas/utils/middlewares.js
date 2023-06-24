const jwt = require("jsonwebtoken");
const {SECRET} = require("../utils/config");


const handler404 = (req, res) => {
    res.status(404).json({ error: "Ruta invalida" });
}

const logger = (req, res, next) => {
    console.log(`Peticion: ${req.method} ${req.url}`);

    next();
}

const handlerError = (error, req, res, next) => {
    if (error.name === "castError") {
        res.status(400).json({ error: error.message })
    } else if (error.name === "syntaxError") {
        res.status(400).json({ error: error.message });
    } else if (error.name === "validationError") {
        res.status(400).json({ error: error.message });
    } else if (error.name === "errorToken") {
        res.status(401).json({ error: error.message });
    } else {
        res.status(500).json({ error: error.message });
    }
}

const verifyToken = async (req, res, next) => {
    const bearerToken = req.headers["authorization"];

    if (typeof bearerToken !== 'undefined') {
        req.token = bearerToken.split(" ")[1];
        try {
            const data = await jwt.verify(req.token, SECRET);
            next();

        } catch (error) {
            next(error);
        }
    } else {
        next({name: "errorToken", message:"No Token"})
    }
}

module.exports = {
    handler404,
    handlerError,
    verifyToken,
    logger
};