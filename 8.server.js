//javscript was chosen for nodehigh
// because it is throughput low latency event model processing

// library - maps on papers. just a tool on the way
// framework - gps system - pretype location - it gives us the direction, opinion - what you need on the way
// platform - automatic driving google car - strong opinion where it is going, you have to say very little, you can just go with the flow


//https://stackoverflow.com/questions/9914816/what-is-an-example-of-the-simplest-possible-socket-io-example

function handleHTTP(req, res){
  if(req.method === "GET"){
      // if(req.url === "/"){
      //   res.writeHead(200,{"Content-type":"text/plain"});
      //
      //   ASQ(function(done){
      //     setTimeout(function(){
      //       done(Math.random());
      //     },1000);
      //   })
      //   .then(function(done, num){
      //     setTimeout(function(){
      //       done("Hello World: " + num);
      //     },1000);
      //   })
      //   .val(function(msg){
      //       res.end(msg);
      //   });
      // }
      if(/^\/\d+(?=$|[\/?#])/.test(req.url)){
        req.addListener("end", function(){
          req.url = req.url.replace(/^\/(\d+).*$/,"/$1.html");
          static_files.serve(req,res);
        });
        req.resume();
      }
      else{
        res.writeHead(403); //Forbidden
        res.end("Get outta here!");
      }
  }else{
    res.writeHead(403); //Forbidden
    res.end("Get outta here!");
  }
}

function handleIO(socket){
  function disconnect(){
    clearInterval(intv);

    console.log("client disconnected");
  }
    console.log("client connected");

    socket.on("disconnect", disconnect);

    var intv = setInterval(function(){
      socket.emit("hello",Math.random());
    },1000);
}

var host = "127.0.0.1";
var port = 8006;

var http = require("http");
var http_serv = http.createServer(handleHTTP).listen(port, host);

var ASQ = require("asynquence");

var node_static = require("node-static");

var static_files = new node_static.Server(__dirname);

var io = require("socket.io").listen(http_serv);

//io.listen(http_serv);

io.on("connection", handleIO);

//https://stackoverflow.com/questions/9914816/what-is-an-example-of-the-simplest-possible-socket-io-example

//configure socket.io -https://socket.io/docs/migrating-from-0-9/
// io.configure(function(){
//   io.enable("browser client minification");
//   io.enable("browser client etag");
//   io.set("log level", 3);
//   io.set("transports",[
//     "websocket",
//     "xhr-polling",
//     "jsonp-polling"
//   ]);
// });
