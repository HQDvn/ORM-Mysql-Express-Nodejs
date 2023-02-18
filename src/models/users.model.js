import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { Model, DataTypes } from 'sequelize';

dotenv.config();

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
      email: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
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

  User.prototype.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
  };

  const hashPassword = (password) => {
    return bcrypt.hashSync(password, parseInt(process.env.SALT));
  };

  User.beforeSave((user, options) => {
    user.password = hashPassword(user.password);
  });

  User.beforeCreate((user, options) => {
    user.id = uuidv4();
    user.password = hashPassword(user.password);
  });

  User.beforeBulkCreate((users, options) => {
    for (const user of users) {
      user.id = uuidv4();
      user.password = hashPassword(user.password);
    }
  });

  return User;
};
