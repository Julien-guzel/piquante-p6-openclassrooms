// import package
const express = require('express');
const router = express.Router();
const controlUtilisateur = require('../controllers/utilisateur');

// crée les routes
router.post('/signup', controlUtilisateur.signup);
router.post('/login', controlUtilisateur.login);

// export les routeurs
module.exports = router;