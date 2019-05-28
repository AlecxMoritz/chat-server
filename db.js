const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.database_url, {
    host : 'localhost'
});

sequelize.authenticate()    
    .then(() => console.log('Connected to Database bruh'))
    .catch(() => console.log('[ Uh-oh ]: ', err.message));

const Users = sequelize.import ('./models/user');
const Channels = sequelize.import('./models/channel');
const UserChannels = sequelize.import('./models/userChannel');
const Chats = sequelize.import('./models/chat');
const Messages = sequelize.import('./models/message');

Users.hasMany(Channels);
Channels.belongsTo(Users);

Users.hasMany(UserChannels);
UserChannels.belongsTo(Channels);
UserChannels.belongsTo(Users);

Users.hasMany(Chats);
Chats.belongsTo(Users);

Users.hasMany(Messages);
Messages.belongsTo(Users);

module.exports = sequelize;