import { Op } from 'sequelize';
import db from '../models/index';
import ErrorHandler from '../helper/error.helper';

const User = db.User;

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
  static async remove(id) {
    await HandleFind.findByPk(id);

    //TODO  Raw Query: UPDATE Users SET deletedAt = NOW() WHERE id = '${id}'
    return await User.destroy({
      where: { id },
    });
  }
}

export class HandleRestore {
  static async restore(id) {
    await HandleFind.findRemoved(id);

    //TODO  Raw Query: UPDATE Users SET deletedAt = NULL WHERE id = '${id}'
    return await User.restore({
      where: { id },
    });
  }
}
