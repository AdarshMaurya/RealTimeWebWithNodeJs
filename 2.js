//#!/usr/bin/env node
//console.log("Hello World");
//process.stdout.write("Hello World!");
function printHelp(){
  console.log("2.js (c) softhinkers.com");
  console.log("");
  console.log("usage:");
  console.log("--help         print this help");
  //console.log("--name       say hello to {NAME}");
  console.log("--file={NAME}  read the file of {NAME} and output");
  console.log("");
}

//var args = require("minimist")(process.argv.slice(2),{ string: "name" });
var args = require("minimist")(process.argv.slice(2),{ string: "file" });
//var name = process.argv[2];

//if(args.help || !args.name){
if(args.help || !args.file){
  printHelp();
  process.exit(1);
}

//var name = args.name;
//console.log("Hello " + name);
var hello = require("./helloworld2.js");
//var contents = hello.say(args.file); //for synchronous call

// var contents = hello.say(args.file, function(err ,contents){ //error first callback syntax
//   if(err){
//       console.error("Error: "+ err);
//   }else{
//       console.log(contents.toString());
//   }
// });

hello.say(args.file)
      // .then(function(done,content){
      //
      // })
      .val(function(contents){
        console.log(contents.toString());
      })
      .or(function(err){
        console.error("Error: "+ err);
      })

//console.log(contents);//array of buffers
//console.log(contents.toString()); //for synchronous call
