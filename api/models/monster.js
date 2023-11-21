const mongoose = require('mongoose');

const monsterSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    monsterType: { type: String, required: true},
    name: { type: String, required: true},
    alignment: { type: String, required: true},
    hit_points: { type: String, required: true},
    actions: { type: String, required: true}

});

monsterSchema.statics.findByAlignment = function(alignment) {
    return this.find({ alignment: alignment });
};

monsterSchema.statics.findByMonsterType = function (monsterType) {
    return this.find({ monsterType: monsterType });
};

monsterSchema.statics.findByMonsterTypeAndName = function(monsterType, name) {
    return this.findOne({ monsterType: monsterType, name: name });
};



module.exports = mongoose.model('Monster', monsterSchema);