const { Model, DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  class Course extends Model {}
  Course.init(
    {
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      estimatedTime: {
        type: DataTypes.STRING,
      },
      materialNeeded: {
        type: DataTypes.STRING,
      },
    },
    { sequelize }
  );

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      as: "Student",
      foreignKey: {
        fieldName: "studentUserId",
        allowNull: false,
      },
    });
  };
  return Course;
};
