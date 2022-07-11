const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
    userId: { type: String, require: true },
    content: { type: String, require: true },
    imageUrl: { type: String, require: true },
    creationDate: { type: Number, require: true },
    likes: { type: Number, default: 0},
    usersLiked: { type: [ "String<userId>" ], default: []},
    
});

module.exports = mongoose.model('sauces', saucesSchema);