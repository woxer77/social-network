const multerMiddleware = require('multer');

const storage = multerMiddleware.diskStorage({
  destination(req, file, cb) {
    cb(null, './src/assets/images');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multerMiddleware({ storage, fileFilter });

module.exports = multerMiddleware(upload);
