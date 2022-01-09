const { Model, DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
    class User extends Model {}
    User.init({
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        emailAddress: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
    }, { sequelize });

    User.associate = (models) => {
        User.hasMany(models.Course, {
            as: "Student",
            foreignKey: {
                fieldName: "userId",
                allowNull: false,
            },
        });
    };
    return User;
};