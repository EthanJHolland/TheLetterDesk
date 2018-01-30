'use strict'

var MongoClient = require('mongodb').MongoClient

exports.test=function(req,res){
    res.json({success: true})
}

exports.send=function(req,res){
    console.log("create");

    MongoClient.connect('mongodb://localhost:27017/tld', function (err, db) {
        if (err){
            res.json({error: 'unable to connect', success: false});
            return;
        } 

        var coll=db.collection('letters');
        var letter=req.body.doc;
        coll.insertOne(letter,  (err, doc) => {
            if(err){
                res.json({success: false})
            }else{
                res.json({success: true})
            }
        });
    })
}

exports.retrieve=function(req,res){
    console.log("retrieve");
    MongoClient.connect('mongodb://localhost:27017/tld', function (err, db) {
        if (err){
            res.json({error: 'unable to connect'});
            return;
        } 

        var coll=db.collection('letters');
        var id=req.params.id;
        var item=coll.findOne({_id: id}, (err, doc) => {
            if(err){
                res.json({error: err});
            }else{
                res.json(doc);
            }
        });
    })  
}