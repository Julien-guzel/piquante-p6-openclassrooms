// import plusieurs packages
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
// import des routes
const routesSauce = require('./routes/sauce');
const routesUtilisateur = require('./routes/utilisateur');

require('dotenv').config()

// connection a mongobd
mongoose
  .connect(
    process.env.Connexion_a_bango_db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//  appel express
const app = express();

// donne acces au corps de la requete
app.use(express.json());

// middlewear general
// permet a l'application d'acceder à l'api
app.use((req, res, next) => {
  // d'accéder à notre API depuis n'importe quelle origine
  res.setHeader("Access-Control-Allow-Origin", "*");
  // qu'elle header sont autorisé
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  // les methodes possible
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

// requet fait par le frontend
app.use('/api/sauces', routesSauce);
app.use('/api/auth', routesUtilisateur);
app.use('/images', express.static(path.join(__dirname, 'images')));

// exports "app"
module.exports = app;