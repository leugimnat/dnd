const mongoose = require('mongoose');

const monsterSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    monsterType: String,
    name: String,
    alignment: String,
    hit_points: String,
    actions: String

});

module.exports = mongoose.model('Monster', monsterSchema);