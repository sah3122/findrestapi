/**
 * Created by Administrator on 2017-01-12.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var DogSchema= mongoose.Schema({
    kind:String,
    kind_num:String
});
var Dog = mongoose.model('dog',DogSchema, 'dog');

/* POST users insert. */
router.post('/insert/:kind/:kind_num', function(req, res, next) {
    var dog = new Dog({
        kind:req.params.kind,
        kind_num:req.params.kind_num
        });
    dog.save(function(err,silence){
        if(err){
            console.err(err);
            throw err;
        }
        res.send('success');
    });
});

/* GET users all list. */
router.get('/list', function(req, res, next) {
    Dog.find(function(err,dog){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(dog);
    });
});

module.exports = router;
