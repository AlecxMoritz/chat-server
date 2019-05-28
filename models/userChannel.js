module.exports = (sequelize, DataTypes) => {
    const UserChannel = sequelize.define('UserChannel', {
        favorite : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue : false
        }
    });

    return UserChannel;
};