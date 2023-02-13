import express from 'express';

const router = express.Router();

import * as pageController from '../../controllers/page.controller';

router.get('/', pageController.homePage);

export default router;
