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

var fs = require("fs");

module.exports.say = say;
