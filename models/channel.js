module.exports = (sequelize, DataTypes) => {
    const Channel = sequelize.define('Channel', {
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                min : {
                    args : [ 4 ],
                    msg : 'Minimum of four characters'
                },

                max : {
                    args : [ 30 ],
                    msg : 'Maximum of thirty characters'
                }
            }
        },

        tagline : {
            type : DataTypes.STRING,
            allowNull : false,
            defaultValue : '',
            validate : {
                max : {
                    args : [ 30 ],
                    msg : 'Maximum of thirty characters'
                }
            }
        },

        purpose : {
            type : DataTypes.STRING,
            allowNull : false,
            defaultValue : '',
            validate : {
                max : {
                    args : [ 240 ],
                    msg : 'Maximum of two hundred and forty characters.'
                }
            }
        }
    });

    return Channel;
};