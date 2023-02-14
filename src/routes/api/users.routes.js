import express from 'express';

const router = express.Router();

import { UserFind, UserUpdate, UserRemove, UserRestore } from '../../controllers/users.controller';

router.get('/:id', UserFind.findByPk);
router.get('/removed/:id', UserFind.findRemoved);

router.put('/:id', UserUpdate.update);

router.delete('/:id', UserRemove.remove);

router.put('/restore/:id', UserRestore.restore);

export default router;
