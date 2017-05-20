/**
 * Created by Administrator on 2017-01-12.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var ChatSchema= mongoose.Schema({
    user1_id : String,
    user1_name : String,
    user2_id : String,
    user2_name : String
});
var Chat = mongoose.model('chat',ChatSchema, 'chat');

/* POST users insert. */
router.post('/insert', function(req, res, next) {
    var chat = new Chat({
        user1_id : req.body.user1_id,
        user1_name : req.body.user1_name,
        user2_id : req.body.user2_id,
        user2_name : req.body.user2_name
    });
    chat.save(function(err,silence){
        if(err){
            console.err(err);
            throw err;
        }
        res.send('success');
    });
});

/* GET loss all list. */
router.get('/list', function(req, res, next) {
    Chat.find(function(err,chat){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(chat);
        console.log(chat);
    });
});

/* GET loss search list. */
router.get('/list/user1/:user1_id/user2/:user2_id', function(req, res, next) {
    Chat.findOne({user1_id:req.params.user1_id,user2_id:req.params.user2_id},function(err,chat){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(chat);
        console.log(chat);
    });
});

/* GET loss one. */
router.get('/list/user/:user', function(req, res, next) {
    Chat.find({$or: [ { "user1_id": req.params.user }, { "user2_id": req.params.user } ]},function(err,chat){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(chat);
        console.log(chat);
    });
});

module.exports = router;
