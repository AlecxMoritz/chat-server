require('dotenv').config();
const app = require('express')();
const db = require('./db');

db.sync();

app.use(require('body-parser').json());

app.use(require('./middleware/headers'));

app.listen(process.env.port, () => {
    console.log(`Spinning on ${process.env.port}`);
});