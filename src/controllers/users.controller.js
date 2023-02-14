import { HandleFind } from '../services/users.service';

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
