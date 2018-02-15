'use strict'

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = require('../constants').MONGO_URL

exports.test=function(req,res){
    res.json({success: Constants.API_URL})
}

exports.send=function(req,res){
    console.log("sending "+req.body.doc.tldid);

    MongoClient.connect(MONGO_URL, function (err, client) {
        if (err){
            res.json({error: 'unable to connect', success: false});
            return;
        } 

        const db=client.db('tld')
        const coll=db.collection('letters');
        const letter=req.body.doc;
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
    MongoClient.connect(MONGO_URL, function (err, client) {
        if (err){
            res.json({error: err});
            return;
        } 

        const db=client.db('tld')
        const coll=db.collection('letters');
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