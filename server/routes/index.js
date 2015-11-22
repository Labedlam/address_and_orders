var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser= require('body-parser');
var pg=require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/addressandorders';


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({expanded:true}));

router.get('/people', function(req,res){
    var results = [];

    pg.connect(connectionString, function(err,client){
        var query = client.query('SELECT id, name FROM users ORDER BY id ASC');

        query.on('row', function(row){
            results.push(row);
        });

        query.on('end', function(){
            client.end();
            return res.json(results);
        });

        if (err){
            console.log(err);
        }
    });
});

//router.post('/data', function(req,res){
//    console.log(req.body);
//
//        userAddress=[];
//        pg.connect(connectionString, function(err,client){
//            var query = client.query('SELECT users.name, addresses.* FROM users JOIN addresses ON users.id = addresses.user_id;');
//
//            query.on('row', function(row){
//                results.push(row);
//            });
//
//            query.on('end', function(){
//                client.end();
//                return res.json(userAddress);
//            });
//
//            if (err){
//                console.log(err);
//            }
//        });
//    var userAddress = {
//        user: req.body.name,
//        address: req.body.address,
//    }
//});
//
//
//
//
//
//    };

router.get('/*', function(req, res){
    var file= req.params[0] || 'assets/views/index.html';
    res.sendFile(path.join(__dirname,'../public/',file));
});
module.exports = router;
