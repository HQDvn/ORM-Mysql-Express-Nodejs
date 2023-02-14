import express from 'express';

const router = express.Router();

import { UserFind, UserUpdate } from '../../controllers/users.controller';

router.get('/:id', UserFind.findByPk);

router.put('/:id', UserUpdate.update);

export default router;
