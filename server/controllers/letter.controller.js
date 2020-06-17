'use strict'

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = require('../constants').MONGO_URL

exports.test=function(req,res){
    res.json({success: true}) //simple test of api 
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
        coll.findOne({tldid: tldid}, {fields: {_id: -1}}, (err, doc) => {
            if(err){
                res.json({error: err});
            }else{
                res.json(doc);
            }
        });
    })  
}

exports.retrieveWithPassword=function(req,res){
    console.log("retrieving "+req.params.id+" with password");
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
                const pass=req.body.password
                console.log(pass+"\t"+doc.password)
                if(!doc.password || doc.password==pass){
                    res.json(doc);
                }else{
                    res.json({error: 'incorrect password'});
                }
            }
        });
    })  
}

exports.getStats = function(req, res) {
    console.log('collecting stats');

        MongoClient.connect(MONGO_URL, function (err, client) {
        if (err){
            res.json({error: err});
            return;
        }

        const db=client.db('tld')
        const coll=db.collection('letters');
        const nonDebug = {$or: [{debug: false}, {debug: {$exists: false}}]}; //exclude letters with debug flag true

        coll.count(nonDebug, (err, total) => {
            if(err){
                res.json({error: err});
            }else{
                coll.count({$and: [nonDebug, {password: {$exists: true}}]}, (err, with_pass) => {
                    if(err){
                        res.json({error: err});
                    }else{
                        coll.count({$and: [nonDebug, {location: {$ne: ""}}]}, (err, with_loc) => {
                            if(err){
                                res.json({error: err});
                            }else{
                                res.json({
                                    total: total,
                                    'with location': with_loc,
                                    'with password': with_pass
                                })
                            }
                        });
                    }
                });
            }
        });
    });
}