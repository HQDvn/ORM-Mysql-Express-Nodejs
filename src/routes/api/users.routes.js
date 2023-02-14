import express from 'express';

const router = express.Router();

import { UserFind, UserUpdate, UserRemove } from '../../controllers/users.controller';

router.get('/:id', UserFind.findByPk);

router.put('/:id', UserUpdate.update);

router.delete('/:id', UserRemove.remove);

export default router;
