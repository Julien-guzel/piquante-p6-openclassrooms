// structure d'une sauce
const mongoose = require('mongoose');

// shcema de donnée pour les sauces
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String },
    heat: { type: Number, required: true },
    likes: { type: Number, require: true, default: 0 },
    dislikes: { type: Number, require: true, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] }
});

// export le schema des sauces
module.exports = mongoose.model('Sauce', sauceSchema);