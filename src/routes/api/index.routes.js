import express from 'express';

const router = express.Router();

import usersRouter from './users.routes';
import uploadsRouter from './uploads.routes';

router.use('/users', usersRouter);
router.use('/uploads', uploadsRouter);

export default router;
