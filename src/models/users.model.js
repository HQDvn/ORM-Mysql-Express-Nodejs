import { Model, DataTypes } from 'sequelize';

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      passport: DataTypes.STRING,
      phone: DataTypes.STRING,
      role: DataTypes.ENUM('admin', 'staff', 'customer'),
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
      paranoid: true,
    },
  );

  return User;
};
