import express from 'express';

const router = express.Router();

import {
  UserRegister,
  UserFind,
  UserUpdate,
  UserRemove,
  UserRestore,
  UserDangerous,
} from '../../controllers/users.controller';

router.post('/register', UserRegister.registerOne);

router.get('/', UserFind.findAll);
router.get('/active', UserFind.findAllActive);
router.get('/removed', UserFind.findAllRemoved);
router.get('/:id', UserFind.findByPk);
router.get('/removed/:id', UserFind.findRemoved);

router.put('/multiple', UserUpdate.updateMultiple);
router.put('/:id', UserUpdate.updateOne);

router.delete('/multiple', UserRemove.removeMultiple);
router.delete('/:id', UserRemove.removeOne);

router.put('/restore/multiple', UserRestore.restoreMultiple);
router.put('/restore/:id', UserRestore.restoreOne);

//! Dangerous API for users, need to be careful when using it !
router.delete('/dangerous/hard/all/205d277h-Feb', UserDangerous.hardRemoveAll); //! DANGEROUS EXTREME
router.delete('/dangerous/hard/multiple', UserDangerous.hardRemoveMultiple);
router.delete('/dangerous/hard/:id', UserDangerous.hardRemove);
router.delete('/dangerous/remove', UserDangerous.removeAll);
router.put('/dangerous/restore', UserDangerous.restoreAll);

export default router;
