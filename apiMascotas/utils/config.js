//disponibiliza las variables del .env
//tuve que hacer un npm i dotenv
require('dotenv').config();

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const SECRET = process.env.SECRET;

module.exports = {
    PORT,
    DB_URI,
    SECRET
}