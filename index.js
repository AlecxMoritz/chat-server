require('dotenv').config();
const app = require('express')();
const db = require('./db');

db.sync();

app.use(require('body-parser').json());

app.use(require('./middleware/headers'));

app.use('/api/auth', require('./controllers/authController'));

app.use(require('./middleware/validateSession'));

app.use('/api/channels', require('./controllers/channelController'));
app.use('/api/userchannels', require('./controllers/userChannelController'));

app.listen(process.env.port, () => {
    console.log(`Spinning on ${process.env.port}`);
});