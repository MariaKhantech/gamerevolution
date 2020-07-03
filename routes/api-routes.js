const db = require('../models');

const router = require('express').Router();


router.get('/', (req, res) => res.json('Sample API get endpoint'));



// Using Game Model to insert new row into Games table in database
router.post('/addgames', (req, res) => {
    db.Game.create({
        game_name: req.body.game_name,
        unique_id: req.body.unique_id
    }).then((result) => {
        console.log(`Added game successfully`);
        res.json(result);
    }).catch((err) => {
        res.json(err);
    });



});
module.exports = router;
