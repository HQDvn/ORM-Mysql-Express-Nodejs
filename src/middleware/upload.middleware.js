import multer from 'multer';
import path from 'path';

const storagePath = path.join(__dirname, '../public/img/uploads/');

const getFilename = (fieldname, originalname) => {
  const timestamp = Date.now();
  const ext = path.extname(originalname);
  return `${fieldname}-${timestamp}${ext}`;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storagePath);
  },

  filename: (req, file, cb) => {
    cb(null, getFilename(file.fieldname, file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error('Only image file uploads are allowed !'));
  }

  cb(null, true);
};

const limits = { fileSize: 5 * 1024 * 1024 };

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;

