function say(filename, cb){
  //var contents = fs.readFileSync(filename); //read file in synchronous way
  //return fs.readFileSync(filename); //read file in synchronous way

//  return fs.readFile(filename, function(contents){
    // the natural pattern of nodes is to do with the callbacks
//  }); // read file in Asynchronous way, with a callback function

    //return fs.readFile(filename, cb);
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

function readFile(filename){
    var sq = ASQ();

    fs.readFile( filename, sq.errfcb() );//error first call backs

    return sq;
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
