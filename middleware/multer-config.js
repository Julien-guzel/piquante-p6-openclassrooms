// appel mackage "multer"
const multer = require('multer');

// dictionnaire mime types, format de fichier defini
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// diskStorage = enregister dans le fichier images
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    // elimine les espaces par des "_"
    const name = file.originalname.split(' ').join('_');
    // genere l'extention des images
    const extension = MIME_TYPES[file.mimetype];
    // Creation nom de fichier unique
    callback(null, name + Date.now() + '.' + extension);
  }
});

// export methode multer configurer
module.exports = multer({storage: storage}).single('image');