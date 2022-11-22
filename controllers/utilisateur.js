// import des package + models utilisateur
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const modelsUtilisateur = require('../models/Utilisateur');

require('dotenv').config()

// connection
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const utilisateur = new modelsUtilisateur({
        email: req.body.email,
        password: hash
      });
      utilisateur.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


// inscription
exports.login = (req, res, next) => {
    modelsUtilisateur.findOne({ email: req.body.email })
    .then(utilisateur => {
        if (!utilisateur) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
        }
        bcrypt.compare(req.body.password, utilisateur.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                }
                res.status(200).json({
                    userId: utilisateur._id,
                    token: jwt.sign(
                        { userId: utilisateur._id },
                        process.env.key,
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};