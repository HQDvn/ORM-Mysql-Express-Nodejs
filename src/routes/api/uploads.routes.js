import express from 'express';

const router = express.Router();

import {
  uploadSingle,
  uploadMultiple,
} from '../../controllers/uploads.controller';
import upload from '../../middleware/upload.middleware';

router.post('/single', upload.single('file'), uploadSingle);

router.post('/multiple', upload.array('files', 2), uploadMultiple);

export default router;

