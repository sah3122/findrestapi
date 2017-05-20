/**
 * Created by Administrator on 2017-01-12.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/*var FindSchema= mongoose.Schema({
    find_title : String,
    find_img_org : String,
    find_img_std : String,
    find_kind : String,
    find_kind_detail : String,
    find_date : String,
    find_sex : String,
    find_age : String,
    find_place : String,
    find_place_detail : String,
    find_color : String,
    find_feature : String,
    find_process : String,
    find_regis_num : String,
    find_rfid_cd : String,
    find_insert_date : String,
    find_lat : String,
    find_long : String,
    find_user_id : String,
    find_user_name : String
});*/

var FindSchema= mongoose.Schema({
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

var Find = mongoose.model('find',FindSchema, 'find');

/* POST users insert. */
/*router.post('/insert', function(req, res, next) {
    var find = new Find({
        find_title : req.body.find_title,
        find_img_org : req.body.find_img_org,
        find_img_std : req.body.find_img_std,
        find_kind : req.body.find_kind,
        find_kind_detail : req.body.find_kind_detail,
        find_date : req.body.find_date,
        find_sex : req.body.find_sex,
        find_age : req.body.find_age,
        find_place : req.body.find_place,
        find_color : req.body.find_color,
        find_feature : req.body.find_feature,
        find_process : req.body.find_process,
        find_regis_num : req.body.find_regis_num,
        find_rfid_cd : req.body.find_rfid_cd,
        find_insert_date : req.body.find_insert_date,
        find_lat : req.body.find_lat,
        find_long : req.body.find_long,
        find_user_id : req.body.find_user_id
    });
    find.save(function(err,silence){
        if(err){
            console.err(err);
            throw err;
        }
        res.send('success');
    });
});*/

router.post('/insert', function(req, res, next) {
    var find = new Find({
        title : req.body.title,
        img_org : req.body.img_org,
        img_std : req.body.img_std,
        kind : req.body.kind,
        kind_detail : req.body.kind_detail,
        date : req.body.date,
        sex : req.body.sex,
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
        name : req.body.name
    });
    find.save(function(err,silence){
        if(err){
            console.err(err);
            throw err;
        }
        res.send('success');
    });
});

/* GET find all list. */
router.get('/list', function(req, res, next) {
    Find.find(function(err,find){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(find);
        console.log(find);
    });
});

/* GET find one. */
router.get('/list/:title', function(req, res, next) {
    Find.findOne({title:req.params.title},function(err,find){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(find);
        console.log(find);
    });
});

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
    Find.find(data,function(err,find){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(find);
        console.log(find);
    });
});

router.get('/list/id/:id', function(req, res, next) {
    Find.findOne({_id:req.params.id},function(err,find){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(find);
        console.log(find);
    });
});

module.exports = router;
