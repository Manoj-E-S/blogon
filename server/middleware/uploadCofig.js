const multer = require('multer');
const path = require('path');

// Storage engine - Where to store?
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads/profileImages'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


function checkFileType(file, cb) {
  const allowedFiletypes = /jpeg|jpg|png|gif/;

  const extname = allowedFiletypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFiletypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}


const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});

module.exports = upload;