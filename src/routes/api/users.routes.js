import express from 'express';

const router = express.Router();

import {
  UserFind,
  UserUpdate,
  UserRemove,
  UserRestore,
} from '../../controllers/users.controller';

router.get('/', UserFind.findAll);
router.get('/active', UserFind.findAllActive);
router.get('/removed', UserFind.findAllRemoved);
router.get('/:id', UserFind.findByPk);
router.get('/removed/:id', UserFind.findRemoved);

router.put('/multiple', UserUpdate.updateMultiple);
router.put('/:id', UserUpdate.updateOne);

router.delete('/multiple', UserRemove.removeMultiple);
router.delete('/:id', UserRemove.removeOne);

router.put('/restore/:id', UserRestore.restoreOne);

export default router;
