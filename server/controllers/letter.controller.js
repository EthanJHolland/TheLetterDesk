'use strict'

var MongoClient = require('mongodb').MongoClient

exports.test=function(req,res){
    res.json({success: true})
}

exports.send=function(req,res){
    console.log("sending "+req.body.doc.tldid);

    MongoClient.connect('mongodb://localhost:27017/tld', function (err, db) {
        if (err){
            res.json({error: 'unable to connect', success: false});
            return;
        } 

        var coll=db.collection('letters');
        var letter=req.body.doc;
        coll.replaceOne({tldid: letter.tldid}, letter, {upsert: true}, (err, doc) => {
            if(err){
                res.json({success: false})
            }else{
                res.json({success: true})
            }
        });
    })
}

exports.retrieve=function(req,res){
    console.log("retrieving "+req.params.id);
    MongoClient.connect('mongodb://localhost:27017/tld', function (err, db) {
        if (err){
            res.json({error: 'unable to connect'});
            return;
        } 

        var coll=db.collection('letters');
        const tldid=req.params.id;
        coll.findOne({tldid: tldid}, (err, doc) => {
            if(err){
                res.json({error: err});
            }else{
                res.json(doc);
            }
        });
    })  
}