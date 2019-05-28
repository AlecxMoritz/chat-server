module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define('Chat', {
        receiving_user : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    });

    return Chat;
};