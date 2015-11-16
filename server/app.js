/**
 * Created by Zeo on 11/16/15.
 */
var express = require('express');
var app = express();
var path =require('path');

app.set("port",( process.env.PORT || 5000)); // *** Study again

app.get('/*', function(req, res){
   var file= req.params[0] || 'assets/views/index.html';
    res.sendFile(path.join(__dirname,'./public/',file));
});

app.listen(app.get('port'),function(){
    console.log('listening to port',app.get('port'));

});