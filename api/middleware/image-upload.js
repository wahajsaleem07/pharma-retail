const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    console.log(file.originalname);
    if(file.originalname == "default.jpg"){
      cb(null, file.originalname);
    }
    else{
      cb(null, new Date().toISOString().split('Z')[0].replace(/:/g, '-') + '-' + file.originalname);
    }
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  console.log(file.mimetype);
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});