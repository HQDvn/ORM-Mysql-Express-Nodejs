import db from '../models/index';
import ErrorHandler from '../helper/error.helper';

const User = db.User;

export class HandleFind {
  static async findByPk(id) {
    //  Raw Query: SELECT * FROM Users WHERE id = '${id}' AND deletedAt IS NULL
    const user = await User.findByPk(id);

    if (!user) {
      throw new ErrorHandler('User Not Found', 404);
    }

    return user;
  }
}

export class HandleUpdate {
  static async update(id, data) {
    await HandleFind.findByPk(id);

    //  Raw Query: UPDATE Users SET fullname = '${data.fullname}' WHERE id = '${id}'
    return await User.update(
      {
        fullname: data.fullname,
      },
      { where: { id } },
    );
  }
}

export class HandleRemove {
  static async remove(id) {
    await HandleFind.findByPk(id);

    //  Raw Query: UPDATE Users SET deletedAt = NOW() WHERE id = '${id}'
    return await User.destroy({
      where: { id },
    });
  }
}
