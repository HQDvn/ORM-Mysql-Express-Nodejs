import express from 'express';

const router = express.Router();

import { UserFind } from '../../controllers/users.controller';

router.get('/:id', UserFind.findByPk);

export default router;
