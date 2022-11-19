const modelsSauces = require('../models/sauces');
const fs = require('fs');



exports.creationSauce = (req, res, next) => {
  const objetSauce = JSON.parse(req.body.sauce);
  delete objetSauce._id;
  delete objetSauce._userId;
  const sauce = new modelsSauces({
      ...objetSauce,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  sauce.save()
  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
  };



exports.recupUneSauce = (req, res, next) => {
  modelsSauces.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  };



  exports.modifiSauce = (req, res, next) => {
    const objetSauce = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete objetSauce._userId;
    modelsSauces.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
              modelsSauces.updateOne({ _id: req.params.id}, { ...objetSauce, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };



 exports.SuppressionSauce = (req, res, next) => {
  modelsSauces.findOne({ _id: req.params.id})
      .then(sauce => {
          if (sauce.userId != req.auth.userId) {
              res.status(401).json({message: 'Not authorized'});
          } else {
              const nomDeFichier = sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${nomDeFichier}`, () => {
                modelsSauces.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};




exports.recupToutesSauces = (req, res, next) => {
    modelsSauces.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  };



// Ajout des likes et dislikes pour chaque sauce
exports.likeDislikeSauce = (req, res) => {


    /* Si le client Like cette sauce */
    if (req.body.like === 1) {
      modelsSauces.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } }
      )
        .then(() => res.status(200).json({ message: "Like ajouté !" }))
        .catch((error) => res.status(400).json({ error }));
  


      /* Si le client disike cette sauce */
    } else if (req.body.like === -1) {
      modelsSauces.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } }
      )
        .then(() => res.status(200).json({ message: "Dislike ajouté !" }))
        .catch((error) => res.status(400).json({ error }));
  


      /* Si le client annule son choix */
    } else {
      modelsSauces.findOne({ _id: req.params.id }).then((resultat) => {
        if (resultat.usersLiked.includes(req.body.userId)) {
          modelsSauces.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
          )
            .then(() => res.status(200).json({ message: "like retiré !" }))
            .catch((error) => res.status(400).json({ error }));
        } else if (resultat.usersDisliked.includes(req.body.userId)) {
          modelsSauces.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
          )
            .then(() => res.status(200).json({ message: "dislike retiré !" }))
            .catch((error) => res.status(400).json({ error }));
        }
      }
      );
    }
  };