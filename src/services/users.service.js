import { Op } from 'sequelize';
import db from '../models/index';
import ErrorHandler from '../helper/error.helper';

const User = db.User;

export class HandleRegister {
  static async registerOne(data) {
    //TODO  Raw Query:
    //TODO  INSERT INTO Users (id, fullname, email, password,
    //TODO                    passport, phone, role, createdAt, updatedAt)
    //TODO  VALUES (UUID(), '${fullname}', '${email}', SHA2('${password}', 256),
    //TODO         '${passport}', '${phone}', '${role}', NOW(), NOW())
    const user = await User.create({
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      passport: data.passport,
      phone: data.phone,
      role: 'customer',
    });

    return user;
  }

  //##########################################################################################

  static async registerMultiple(data) {
    //TODO   INSERT INTO Users (id, fullname, email, password,
    //TODO                     passport, phone, role, createdAt, updatedAt)
    //TODO   VALUES ${data.map(user => `(
    //TODO     UUID(), '${user.fullname}', '${user.email}', SHA2('${user.password}', 256),
    //TODO     '${user.passport}', '${user.phone}', 'customer', NOW(), NOW() )`).join(',')};`
    const users = await User.bulkCreate(data);

    return users;
  }
}

export class HandleFind {
  static async findByPk(id) {
    //TODO  Raw Query: SELECT * FROM Users WHERE id = '${id}' AND deletedAt IS NULL
    const user = await User.findByPk(id);

    if (!user) {
      throw new ErrorHandler('User Not Found', 404);
    }

    return user;
  }

  //##########################################################################################

  static async findRemoved(id) {
    //TODO  Raw Query: SELECT * FROM Users WHERE id = '${id}' AND deletedAt IS NOT NULL
    const user = await User.findOne({
      where: {
        id,
        deletedAt: {
          [Op.not]: null,
        },
      },
      paranoid: false,
    });

    if (!user) {
      throw new ErrorHandler('User Not Found', 404);
    }

    return user;
  }

  //##########################################################################################

  static async findAll() {
    //TODO  Raw Query: SELECT * FROM Users
    //TODO             WHERE deletedAt IS NOT NULL OR deletedAt IS NULL
    //TODO             ORDER BY deletedAt ASC
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { deletedAt: { [Op.eq]: null } },
          { deletedAt: { [Op.ne]: null } },
        ],
      },
      paranoid: false,
      order: [['deletedAt', 'ASC']],
    });

    return users;
  }

  //##########################################################################################

  static async findAllActive() {
    //TODO  Raw Query: SELECT * FROM Users WHERE deletedAt IS NULL ORDER BY fullname ASC
    const users = await User.findAll({
      order: [['fullname', 'ASC']],
    });

    return users;
  }

  //##########################################################################################

  static async findAllRemoved() {
    //TODO  Raw Query: SELECT * FROM Users WHERE deletedAt IS NOT NULL ORDER BY fullname ASC;
    const users = await User.findAll({
      where: {
        deletedAt: {
          [Op.not]: null,
        },
      },
      paranoid: false,
      order: [['fullname', 'ASC']],
    });

    return users;
  }
}

export class HandleUpdate {
  static async updateOne(id, data) {
    await HandleFind.findByPk(id);

    //TODO  Raw Query: UPDATE Users SET fullname = '${data.fullname}' WHERE id = '${id}'
    return await User.update(
      {
        fullname: data.fullname,
      },
      { where: { id } },
    );
  }

  //##########################################################################################

  static async updateMultiple(data) {
    if (!data || data.length === 0) {
      throw new ErrorHandler('Please, enter users ID to update !', 400);
    }

    //TODO  Raw Query: UPDATE Users SET fullname = CASE id
    //TODO                WHEN '${id-1}' THEN '${fullname-1}'
    //TODO                WHEN '${id-2}' THEN '${fullname-2}'
    //TODO                ...
    //TODO              END
    //TODO             WHERE id IN (id-1, id-2, ...)

    return await Promise.all(
      data.map(({ id, fullname }) =>
        User.update({ fullname }, { where: { id } }),
      ),
    );
  }
}

export class HandleRemove {
  static async removeOne(id) {
    await HandleFind.findByPk(id);

    //TODO  Raw Query: UPDATE Users SET deletedAt = NOW() WHERE id = '${id}'
    return await User.destroy({
      where: { id },
    });
  }

  //##########################################################################################

  static async removeMultiple(ids) {
    if (!ids) {
      throw new ErrorHandler('Please, enter users ID to remove !', 400);
    }

    //TODO  Raw Query: UPDATE Users SET deletedAt = NOW() WHERE id IN ('${id-1}','${id-2}', ...)
    return await User.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }
}

export class HandleRestore {
  static async restoreOne(id) {
    await HandleFind.findRemoved(id);

    //TODO  Raw Query: UPDATE Users SET deletedAt = NULL WHERE id = '${id}'
    return await User.restore({
      where: { id },
    });
  }

  //##########################################################################################

  static async restoreMultiple(ids) {
    if (!ids) {
      throw new ErrorHandler('Please, enter users ID to restore !', 400);
    }

    //TODO  Raw Query: UPDATE Users SET deletedAt = NULL WHERE id IN ('${id-1}','${id-2}', ...)
    return await User.restore({
      where: {
        id: { [Op.in]: ids },
      },
    });
  }
}

export class HandleDangerous {
  static async hardRemove(id) {
    await HandleFind.findByPk(id);

    //TODO  Raw Query: DELETE FROM Users WHERE id = '${id}'
    return await User.destroy({
      where: { id },
      force: true,
    });
  }

  //##########################################################################################

  static async hardRemoveMultiple(ids) {
    if (!ids) {
      throw new ErrorHandler('Please, enter users ID to remove !', 400);
    }

    //TODO  Raw Query: DELETE FROM Users WHERE id IN ('${id-1}','${id-2}', ...)
    return await User.destroy({
      where: { id: { [Op.in]: ids } },
      force: true,
    });
  }

  //##########################################################################################

  static async removeAll() {
    //TODO  Raw Query: UPDATE Users SET deletedAt = NOW()
    return await User.destroy({
      where: {},
    });
  }

  //##########################################################################################

  static async restoreAll() {
    //TODO  Raw Query: UPDATE Users SET deletedAt = NULL
    return await User.restore();
  }

  //##########################################################################################

  //! DANGEROUS EXTREME
  static async hardRemoveAll() {
    //TODO  Raw Query: DELETE FROM Users
    return await User.destroy({
      where: {},
      truncate: true,
      force: true,
    });
  }
}
