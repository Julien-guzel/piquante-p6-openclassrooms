// Création du type de données de la base "User"
const mongoose = require('mongoose');

// Importation du module empechant la création de deux comptes avec le même email
const uniqueValidator = require('mongoose-unique-validator');

// shcema de donnée pour les utilisateurs
const schemaUtilisateur = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//  empechant la création de deux comptes avec le même email
schemaUtilisateur.plugin(uniqueValidator);

// export le schema des utilisateur
module.exports = mongoose.model('Utilisateur', schemaUtilisateur);