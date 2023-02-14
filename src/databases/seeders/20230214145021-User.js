import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

class User {
  constructor(fullname, email, password, passport, phone, role) {
    this.id = uuidv4();
    this.fullname = fullname;
    this.email = email;
    this.password = this.hashPassword(password);
    this.passport = passport;
    this.phone = phone;
    this.role = role;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  hashPassword(pass) {
    return bcrypt.hashSync(pass, parseInt(process.env.SALT));
  }

  static up(queryInterface, Sequelize) {
    const users = [
      new User('Admin001', 'Admin001@gmail.com', 'admin@12', '048095000001', '0905905901', 'Admin'),
      new User('Admin002', 'Admin002@gmail.com', 'admin@12', '048095000002', '0905905902', 'Admin'),
      new User('Admin003', 'Admin003@gmail.com', 'admin@12', '048095000003', '0905905903', 'Admin'),
      new User('Admin004', 'Admin004@gmail.com', 'admin@12', '048095000004', '0905905904', 'Admin'),
      new User('Admin005', 'Admin005@gmail.com', 'admin@12', '048095000005', '0905905905', 'Admin'),
    ];

    const userRecords = users.map((user) => {
      const { id, fullname, email, password, passport, phone, role, createdAt, updatedAt } = user;
      return { id, fullname, email, password, passport, phone, role, createdAt, updatedAt };
    });

    return queryInterface.bulkInsert('Users', userRecords);
  }

  static down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
}

export default User;
