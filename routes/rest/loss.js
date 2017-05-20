/**
 * Created by Administrator on 2017-01-12.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/*var LossSchema= mongoose.Schema({
    loss_title : String,
    loss_img_org : String,
    loss_img_std : String,
    loss_kind : String,
    loss_kind_detail : String,
    loss_date : String,
    loss_sex : String,
    loss_age : String,
    loss_place : String,
    loss_place_detail : String,
    loss_color : String,
    loss_feature : String,
    loss_process : String,
    loss_regis_num : String,
    loss_rfid_cd : String,
    loss_insert_date : String,
    loss_lat : String,
    loss_long : String,
    loss_user_id : String,
    loss_user_name : String
});*/

var LossSchema= mongoose.Schema({
    title : String,
    img_org : String,
    img_std : String,
    kind : String,
    kind_detail : String,
    date : String,
    sex : String,
    age : String,
    place : String,
    place_detail : String,
    color : String,
    feature : String,
    process : String,
    regis_num : String,
    rfid_cd : String,
    insert_date : String,
    lat : String,
    lng : String,
    user_id : String,
    user_name : String
});

var Loss = mongoose.model('loss',LossSchema, 'loss');

/* POST users insert. */
/*router.post('/insert', function(req, res, next) {
    var loss = new Loss({
        loss_title : req.body.loss_title,
        loss_img_org : req.body.loss_img_org,
        loss_img_std : req.body.loss_img_std,
        loss_kind : req.body.loss_kind,
        loss_kind_detail : req.body.loss_kind_detail,
        loss_date : req.body.loss_date,
        loss_sex : req.body.loss_sex,
        loss_age : req.body.loss_age,
        loss_place : req.body.loss_place,
        loss_place_detail : req.body.loss_place_detail,
        loss_color : req.body.loss_color,
        loss_feature : req.body.loss_feature,
        loss_process : req.body.loss_process,
        loss_regis_num : req.body.loss_regis_num,
        loss_rfid_cd : req.body.loss_rfid_cd,
        loss_insert_date : req.body.loss_insert_date,
        loss_lat : req.body.loss_lat,
        loss_long : req.body.loss_long,
        loss_user_id : req.body.loss_user_id,
        loss_user_name : req.body.loss_user_name
    });
    loss.save(function(err,silence){
        if(err){
            console.err(err);
            throw err;
        }
        res.send('success');
    });
});*/

router.post('/insert', function(req, res, next) {
    var loss = new Loss({
        title : req.body.title,
        img_org : req.body.img_org,
        img_std : req.body.img_std,
        kind : req.body.kind_data,
        kind_detail : req.body.kind_detail_data,
        date : req.body.date,
        sex : req.body.sex_data,
        age : req.body.age,
        place : req.body.place,
        place_detail : req.body.place_detail,
        color : req.body.color,
        feature : req.body.feature,
        process : req.body.process,
        regis_num : req.body.regis_num,
        rfid_cd : req.body.rfid_cd,
        insert_date : req.body.insert_date,
        lat : req.body.lat,
        lng : req.body.lng,
        user_id : req.body.user_id,
        user_name : req.body.user_name
    });
    loss.save(function(err,silence){
        if(err){
            console.err(err);
            throw err;
        }
        res.send('success');
    });
});

/* GET loss all list. */
router.get('/list', function(req, res, next) {
    Loss.find(function(err,loss){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(loss);
        console.log(loss);
    });
});

/* GET loss push list. */
router.get('/list/lat/:lat/lng/:lng', function(req, res, next) {
    Loss.find({_id:req.params.id},function(err,loss){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(loss);
        console.log(loss);
    });
});

router.get('/list/index/:index', function(req, res, next) {
    /*Loss.find({}, {skip:1,limit:10  }, function(err,loss){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(loss);
        console.log(loss);
    });*/
    Loss.find().limit(10).skip(Number(req.params.index)).exec(function(err,loss){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(loss);
        console.log(loss);
    });
});
/* GET loss search list. */
/*router.get('/list/kind/:loss_kind/detail/:loss_kind_detail/sex/:loss_sex', function(req, res, next) {
    var data = {};
    if(req.params.loss_kind != "all"){
        data.loss_kind = req.params.loss_kind;
    }
    if(req.params.loss_kind_detail != "all"){
        data.loss_kind_detail = req.params.loss_kind_detail;
    }
    if(req.params.loss_sex != "all"){
        data.loss_sex = req.params.loss_sex;
    }
    console.log(data);
    Loss.find(data,function(err,loss){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(loss);
        console.log(loss);
    });
});*/

router.get('/list/kind/:kind_data/detail/:kind_detail_data/sex/:sex_data', function(req, res, next) {
    var data = {};
    if(req.params.kind_data != "all"){
        data.kind = req.params.kind_data;
    }
    if(req.params.kind_detail_data != "all"){
        data.kind_detail = req.params.kind_detail_data;
    }
    if(req.params.sex_data != "all"){
        data.sex = req.params.sex_data;
    }
    console.log(data);
    Loss.find(data,function(err,loss){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(loss);
        console.log(loss);
    });
});

/* GET loss one. */
router.get('/list/:title', function(req, res, next) {
    Loss.findOne({title:req.params.title},function(err,loss){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(loss);
        console.log(loss);
    });
});

router.get('/list/id/:id', function(req, res, next) {
    Loss.findOne({_id:req.params.id},function(err,loss){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(loss);
        console.log(loss);
    });
});

module.exports = router;
