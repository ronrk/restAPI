const bcrypt = require("bcryptjs");
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class User extends Model {}
    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Please provie a first name",
                },
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "last name is required",
                },
                notEmpty: {
                    msg: "Please provie a last name",
                },
            },
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "The email you entered alredy exist",
            },
            validate: {
                notNull: {
                    msg: "An email is required",
                },
                isEmail: {
                    msg: "Please provide a valid email adress",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "An password is required",
                },
                len: {
                    args: [8, 20],
                    msg: "The password should be between 8 and 20 characters in length",
                },
            },
            set(val) {
                const hashedPassword = bcrypt.hashSync(val, 10);
                this.setDataValue("password", hashedPassword);
            },
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