'use strict'

var MongoClient = require('mongodb').MongoClient

exports.create=function(req,res){
    console.log("create envelope");

    MongoClient.connect('mongodb://localhost:27017/tld', function (err, db) {
        if (err){
            res.json({error: 'unable to connect'});
            return;
        } 

        var coll=db.collection('envelopes');
        var envelope=req.body.envelope;
        coll.insertOne(envelope,  (err, doc) => {
            if(err){
                res.json({success: false})
            }else{
                res.json({success: true})
            }
        });
    })
}

exports.retrieve=function(req,res){
    console.log("retrieve envelope");
    MongoClient.connect('mongodb://localhost:27017/tld', function (err, db) {
        if (err){
            res.json({error: 'unable to connect'});
            return;
        } 

        var coll=db.collection('envelopes');
        var id=req.params.id;
        var item=coll.findOne({_id: id}, (err, doc) => {
            console.log('found one');
            if(err){
                res.json({error: err});
            }else{
                console.log(doc);
                res.json(doc);
            }
        });
    })  
}