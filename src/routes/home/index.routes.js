import express from 'express';

const router = express.Router();

import pageRouter from './page.routes';

router.use('/', pageRouter);

export default router;
