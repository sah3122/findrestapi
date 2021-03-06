/**
 * Created by Administrator on 2017-01-12.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var CatSchema= mongoose.Schema({
    kind:String,
    kind_num:String
});
var Cat = mongoose.model('cat',CatSchema, 'cat');

/* POST users insert. */
router.post('/insert/:kind/:kind_num', function(req, res, next) {
    var cat = new Cat({
        kind:req.params.kind,
        kind_num:req.params.kind_num
        });
    cat.save(function(err,silence){
        if(err){
            console.err(err);
            throw err;
        }
        res.send('success');
    });
});

/* GET users all list. */
router.get('/list', function(req, res, next) {
    Cat.find(function(err,cat){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(cat);
        console.log(cat);
    });
});

module.exports = router;
