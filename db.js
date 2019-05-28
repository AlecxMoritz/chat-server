const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.database_url, {
    host : 'localhost'
});

sequelize.authenticate()    
    .then(() => console.log('Connected to Database bruh'))
    .catch(() => console.log('[ Uh-oh ]: ', err.message));

module.exports = sequelize;