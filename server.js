var express = require('express');
var app = express();
var MongoClient = require( 'mongodb' ).MongoClient;
var bodyParser = require( 'body-parser');
var objectId = require('mongodb').ObjectID;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var url = 'mongodb://localhost:27017/farm';

//create - in this case we don't need a "new" request as we are working with api
app.post('/animals',function(req, res){
  MongoClient.connect(url,function(err,db){
    var collection = db.collection( 'animals' )
    collection.insert( req.body )
    res.status(200).end();
    db.close()
  })
})

//update
app.put('/animals/:id',function(req, res){
  MongoClient.connect(url,function(err, db){
    console.log(req.params)
    var collection = db.collection('animals');
    collection.updateOne( {_id: new objectId(req.params.id)}, {$set: req.body } )
    res.status(200).end();
    db.close()
  })

})

//delete
app.delete('/animals/:id', function(req,res){
  MongoClient.connect(url,function(err,db){
    var collection = db.collection('animals');
    collection.remove({_id: new objectId(req.params.id)})
    res.status(200).end();
    db.close
  })
})

//index
app.get('/animals',function(req,res){
  MongoClient.connect( url, function( err,db ){
    var collection = db.collection( 'animals' )
    collection.find( {} ).toArray( function(err, docs){
      res.json( docs );
      db.close();
    })
  })
})

app.listen('3000',function(){
  console.log('running at 3000')
})