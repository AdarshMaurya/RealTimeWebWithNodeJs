//  Ecosystem around module - how to publish it in the npm
//

function say(filename, cb){
    return fs.readFile(filename, function(err, contents){
        if(err) {
          cb(err);
        }
        else{
          setTimeout(function(){
            //cb(err, contents); //as it is in else part so no err
              cb(null, contents);
          },1000);//for AJAX call or Database connection etc
        }
    });//putting own wrapper function
}

// function readFile(filename){ // It reads the entire file, not efficient if file is too large
//     var sq = ASQ();
//
//     fs.readFile( filename, sq.errfcb() );//error first call backs
//
//     return sq;
// }

function readFile(filename){
  // read file using the stream
   return ASQ(function(done){

     var stream = fs.createReadStream(filename);
     var contents ="";

     //Pipe the createReadStream
     stream.pipe( fs.createWriteStream(filename+".backup") );

     stream.on("data",function(chunk){
        //console.log("data"); // temporary logging to be aware that stream loads in chunks
       contents += chunk;
     });

     stream.on("end", function(){
       done(contents);
     });

   });
}

function delayMsg(done, contents){
    setTimeout(function(){
        done(contents);// done trigger
    },1000);
}

function say(filename){
  return readFile(filename)
        .then(delayMsg);
}


var fs = require("fs");
var ASQ = require("asynquence");
require("asynquence-contrib");

module.exports.say = say;
