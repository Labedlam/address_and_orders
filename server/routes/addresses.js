/**
 * Created by Zeo on 11/21/15.
 */
var express = require('express');
var router = express.Router();
var pg=require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/addressandorders';


// This will Return the entire list of people
router.get('/', function(req,res){
    var results = [];
    var userID=req.query.userID;
    //console.log("this is req.query.userId",req.query.userId);

    pg.connect(connectionString, function(err,client,done){
        var query ="";

        if(userID){
            query = client.query("SELECT * FROM addresses WHERE user_id=$1",[userID]);
        }else{
            query=client.query("SELECT * FROM addresses ORDER BY user_id ASC")
        }

        // Stream results back one row at a time
        query.on('row', function(row){
            results.push(row);
        });

        //After all data is returned, close connection and return results
        query.on('end', function(){
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if (err){
            console.log(err);
        }
    });
});

module.exports=router;