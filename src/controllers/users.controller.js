import { HandleFind, HandleUpdate, HandleRemove, HandleRestore } from '../services/users.service';

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

  static async findRemoved(req, res, next) {
    try {
      const id = req.params.id;

      const result = await HandleFind.findRemoved(id);

      res.status(200).json({
        status: 200,
        message: `Found a removed user named: ${result.fullname}`,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async findAll(req, res, next) {
    try {
      const result = await HandleFind.findAll();

      res.status(200).json({
        status: 200,
        message: 'All Users.',
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

export class UserRemove {
  static async remove(req, res, next) {
    try {
      const id = req.params.id;

      const result = await HandleRemove.remove(id);

      res.status(200).json({
        status: 200,
        message: 'Successfully removed user.',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

export class UserRestore {
  static async restore(req, res, next) {
    try {
      const id = req.params.id;

      const result = await HandleRestore.restore(id);

      res.status(200).json({
        status: 200,
        message: 'Successfully restored removed user.',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}
