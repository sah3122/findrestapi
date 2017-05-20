/**
 * Created by Administrator on 2017-01-12.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var UserSchema= mongoose.Schema({
    user_token:String,
    user_id:String,
    user_name:String
});
var User = mongoose.model('users',UserSchema);

/* POST users insert. */
router.post('/insert', function(req, res, next) {
    console.log(req.body.toString());
    var user = new User({
        user_name:req.body.user_name,
        user_id:req.body.user_id,
        user_token:req.body.user_token
        });
    user.save(function(err,silence){
        if(err){
            console.err(err);
            throw err;
        }
        res.send('success');
    });
});

/* GET users all list. */
router.get('/list', function(req, res, next) {
    User.find(function(err,user){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(user);
    });
});

/* GET users one. */
router.get('/id/:user_id', function(req, res, next) {
    User.findOne({user_id:req.params.user_id},function(err,user){
        if(err) return res.status(500).send({error: 'database failure1'});
        res.json(user);
    });
});

/* UPDATE users one. */
router.put('/id/:user_id', function(req, res){
    User.update({ user_id: req.params.user_id }, { $set: req.body }, function(err, output){
        if(err) res.status(500).json({ error: 'database failure' });
        console.log(output);
        console.log(req.body.user_token);
        if(!output.n) return res.status(404).json({ error: 'user not found' });
        res.json( { message: 'user updated' } );
    })

});

module.exports = router;
