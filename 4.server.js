//javscript was chosen for nodehigh
// because it is throughput low latency event model processing

// library - maps on papers. just a tool on the way
// framework - gps system - pretype location - it gives us the direction, opinion - what you need on the way
// platform - automatic driving google car - strong opinion where it is going, you have to say very little, you can just go with the flow


function handleHTTP(req, res){
  if(req.method === "GET"){
      if(req.url === "/"){
        res.writeHead(200,{"Content-type":"text/plain"});
        
        setTimeout(function(){
          var num = Math.random();
          setTimeout(function(){
            res.end("Hello World"+ num);
          },1000);
        },1000);
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
var host = "localhost";
var port = 8006;

var http = require("http");
var http_serv = http.createServer(handleHTTP).listen(port, host);

var ASQ = require("asynquence");
