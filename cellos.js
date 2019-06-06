const express = require('express');
const fs =  require('fs');
const dirmaker = require('dirmaker');
const program = require('commander');
var app = express();

//set the base dir
global.__basedir = __dirname;

//no favicon bro
app.get('/favicon.ico', (req, res) => res.status(204));


//the view engine
app.set('view engine', 'ejs');
app.use(__dirname + 'assets', express.static('assets/'));




//take the terminal args
program.option('-p --port <pnumber>', 'Port number').option('-l --location <location>', 'Server Location').parse(process.argv);
var port = 3000 || program.port;




//if first call with args location
if(typeof program.location != undefined){

    app.use(program.location, express.static(program.location));

app.use(function(req, res, next){

  
    dirmaker(res, program.location + req.url, program.location);

    console.log('Someone called me at : ' + program.location.slice(0, -1) + req.url);
    res.end();

});//end of route


}//end of if





//listen to port


app.listen(port, function() {
    console.log("Cellos is running on port :" + port);
});

//get location

//serve the given location
console.log("Cellos is pointing at : " + program.location);
console.log(`Open browser and visit 'http://localhost:${port}'`);



//kill the server when ctrl + c is pressed
process.on('SIGINT', function() {
    console.log( "\nCellos is stopped.");
    process.exit(1);
  });

    
    

 











