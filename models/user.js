module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        screenname : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                min : {
                    args : [5],
                    msg : 'Minimum of five characters required.'
                },

                max : {
                    args : [20],
                    msg : 'Maximum of twenty characters.'
                }
            }
        },

        email : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                isEmail : true,
                max : {
                    args : [40],
                    msg : 'Maximum of forty characters.'
                }
            }
        },

        name : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                min : {
                    args : [10],
                    msg : 'Minimum of ten characters required.'
                },

                max : {
                    args : [50],
                    msg : 'Maximum of fifty characters.'
                }
            }
        },

        bio : {
            type : DataTypes.TEXT,
            allowNull : false,
            defaultValue : '',
            validate : {
                max : {
                    args : [ 240 ],
                    msg : 'Maximum of two hundred and forty characters.'
                }
            }
        },

        password : {
            type : DataTypes.STRING,
            allowNull : false
        }
    });

    return User;
};