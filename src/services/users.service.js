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
