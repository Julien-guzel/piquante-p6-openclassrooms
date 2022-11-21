// import du package "express"
const express = require('express');
// outils router du package "express"
const router = express.Router();

// controle authentification avec un TOKEN
const auth = require('../middleware/auth');
// capturer les fichier envoyée
const multer = require('../middleware/multer-config');
// import les differents controllers
const sauceCtrl = require('../controllers/sauce');

// differente route de "CRUD" + like dislike, authentifier
router.get('/', auth, sauceCtrl.recupToutesSauces);
router.post('/', auth, multer, sauceCtrl.creationSauce);
router.get('/:id', auth, sauceCtrl.recupUneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifiSauce);
router.delete('/:id', auth, sauceCtrl.SuppressionSauce);
router.post('/:id/like', auth, sauceCtrl.likeDislikeSauce);

// export les router
module.exports = router;