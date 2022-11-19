const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/sauce');

router.get('/', auth, stuffCtrl.recupToutesSauces);
router.post('/', auth, multer, stuffCtrl.creationSauce);
router.get('/:id', auth, stuffCtrl.recupUneSauce);
router.put('/:id', auth, multer, stuffCtrl.modifiSauce);
router.delete('/:id', auth, stuffCtrl.SuppressionSauce);
router.post('/:id/like', auth, stuffCtrl.likeDislikeSauce);

module.exports = router;