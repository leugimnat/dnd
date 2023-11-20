const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Monster = require('../models/monster'); 
const monster = require('../models/monster');

router.get('/', (req, res, next) => 
{
    Monster.find()
    .select('name monsterType alignment hit_points actions')
    .exec()
    .then
    (docs => 
        {
            const response = {
                count: docs.length,
                monsters: docs.map(doc => {
                    return {
                        name: doc.name,
                        monsterType: doc.monsterType,
                        alignment: doc.alignment,
                        hit_points: doc.hit_points,
                        actions: doc.actions,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/monsters/' + doc.monsterType + '/' + doc.name
                        }
                    }
                })
            };
            console.log(docs);
            if (docs.length >= 0) 
        res.status(200).json(response)
        }
    )
    .catch
    (err => 
        {
            console.log(err);
            res.status(500).json({
                error: err});
        }
    );
}
)
 
router.post('/', (req, res, next) => {
    const monster = new Monster({
        _id: new mongoose.Types.ObjectId(),
        monsterType: req.body.monsterType,
        name: req.body.name,
        alignment: req.body.alignment,
        hit_points: req.body.hit_points,
        actions: req.body.actions
    });
    monster.save().then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'Created monster successfully',
            createdMonster: {
                monsterType: result.monsterType,
                name: result.name,
                alignment: result.alignment,
                hit_points: result.hit_points,
                actions: result.actions,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/monsters/' + result.monsterType + '/' + result.name
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    
    });
});

router.get('/alignment/:alignment', (req, res, next) => {
    const alignment = req.params.alignment;
    Monster.findByAlignment(alignment).select('name monsterType alignment hit_points actions')
    .exec()
    .then(doc => { 
        console.log("From database", doc); 
    if (doc) {
        res.status(200).json({
            monster: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/monsters/Alignment/' + alignment
            
        }});
    } else {
        res.status(404).json({message: 'No valid entry found for provided Alignment'});
    }
})
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err});
    })
});

router.get('/monsterType/:monsterType', (req, res, next) => {
    const monsterType = req.params.monsterType;
    Monster.findByMonsterType(monsterType).select('name monsterType alignment hit_points actions').exec().then(doc => { console.log("From database", doc); 
    if (doc) {
        res.status(200).json({
            monster: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/monsters/monsterType/'+ monsterType
            
        }});
    } else {
        res.status(404).json({message: 'No valid entry found for provided MonsterType'});
    }
})
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err});
    })
});

router.get('/:monsterType/:name', (req, res, next) => {
    const monsterType = req.params.monsterType;
    const name = req.params.name;

    Monster.findByMonsterTypeAndName(monsterType, name).select('name monsterType alignment hit_points actions')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    monster: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/monsters/' + monsterType + '/' + name
                    
                }});
            } else {
                res.status(404).json({ message: 'No valid entry found for provided Alignment and Name' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch('/:monsterType/:name', (req, res, next) => {
    const monsterType = req.params.monsterType;
    const name = req.params.name;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Monster.updateOne({ monsterType: monsterType, name: name }, {
        $set: updateOps
    })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Monster updated",
            request: {
                type: 'GET',
                url: 'http://localhost:3000/monsters/' + monsterType + '/' + name
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});



router.delete('/:monsterType/:name', (req, res, next) => {
    const monsterType = req.params.monsterType;
    const name = req.params.name;
    Monster.deleteOne({ monsterType: monsterType, name: name })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;