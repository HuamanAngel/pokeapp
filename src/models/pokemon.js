let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let collectionName = 'pokemon';
let PokemonSchema = new Schema({
    name: { type: String },
    description: {type: String },
    type: {type: String},
    image: {type: String}
});

module.exports = mongoose.model('pokemon',PokemonSchema,collectionName);