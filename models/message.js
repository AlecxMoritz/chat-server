module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        chat_chan_id : {
            type : DataTypes.INTEGER,
            allowNull : false
        },

        text : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                max : {
                    args : [ 140 ],
                    msg : 'Maximum one hundred and forty characters.'
                }
            }
        }
    });

    return Message;
};