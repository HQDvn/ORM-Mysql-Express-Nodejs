import { HandleFind, HandleUpdate } from '../services/users.service';

export class UserFind {
  static async findByPk(req, res, next) {
    try {
      const id = req.params.id;

      const result = await HandleFind.findByPk(id);

      res.status(200).json({
        status: 200,
        message: `Found a user named: ${result.fullname}`,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

export class UserUpdate {
  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;

      const result = await HandleUpdate.update(id, data);

      res.status(200).json({
        status: 200,
        message: 'Successfully updated user.',
        data: result[0],
      });
    } catch (err) {
      next(err);
    }
  }
}
