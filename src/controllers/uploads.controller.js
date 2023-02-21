import ErrorHandler from '../helper/error.helper';

export const uploadSingle = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file || file.length < 1) {
      throw new ErrorHandler('Please select a file to upload!', 400);
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully uploaded a file.',
      result: file,
    });
  } catch (err) {
    next(err);
  }
};

export const uploadMultiple = async (req, res, next) => {
  try {
    const files = req.files;

    if (!files || files.length < 1) {
      throw new ErrorHandler('Please select multiple files to upload!', 400);
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully uploaded multiple files.',
      result: files,
    });
  } catch (err) {
    next(err);
  }
};

