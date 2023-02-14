import express from 'express';

const router = express.Router();

import { UserFind, UserUpdate, UserRemove } from '../../controllers/users.controller';

router.get('/:id', UserFind.findByPk);
router.get('/removed/:id', UserFind.findRemoved);

router.put('/:id', UserUpdate.update);

router.delete('/:id', UserRemove.remove);

export default router;
