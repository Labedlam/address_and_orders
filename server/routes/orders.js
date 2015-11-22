/**
 * Created by Zeo on 11/22/15.
 */
var express = require('express');
var router = express.Router();
var pg=require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/addressandorders';


// This will Return the entire list of people
router.get('/', function(req,res){
    //get parameters from req.query object
    var queryOptions = {
         userID : req.query.userID,
        startDate: req.query.startDate || '01-01-2010',
        endDate: req.query.endDate || '01-01-2016'

    };

    var results=[];

    console.log("this is req.query.userId",req.query);

    pg.connect(connectionString, function(err,client,done){

        //I still need to study the logic behind whats happening to code below. There  are relation connections in which I want to understand the mechinism that's making that connection
        var query = "SELECT users.name, addresses.address_type, addresses.address_street, orders.* \
            FROM orders \
            JOIN addresses \
                ON addresses.address_id = orders.ship_address_id \
            JOIN users \
                ON users.id = orders.user_id \
            WHERE orders.order_date between $1 AND $2 \
                AND orders.user_id = $3";

        var result= client.query(query, [queryOptions.startDate, queryOptions.endDate,queryOptions.userID]);

        // Stream results back one row at a time
        result.on('row', function(row){
            results.push(row);
        });

        //After all data is returned, close connection and return results
        result.on('end', function(){
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