const mongoose = require('mongoose');

const monsterSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    monsterType: String,
    name: String,
    alignment: String,
    hit_points: String,
    actions: String

});

monsterSchema.statics.findByAlignment = function(alignment) {
    return this.findOne({ alignment: alignment });
};

monsterSchema.statics.findByMonsterType = function(monsterType) {
    return this.findOne({ monsterType: monsterType });
};

monsterSchema.statics.findByMonsterTypeAndName = function(monsterType, name) {
    return this.findOne({ monsterType: monsterType, name: name });
};



module.exports = mongoose.model('Monster', monsterSchema);