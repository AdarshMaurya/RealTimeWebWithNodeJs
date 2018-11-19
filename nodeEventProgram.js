//https://nodejs.org/api/events.html#events_eventemitter_listenercount_emitter_eventname

/*
Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture in which certain kinds of objects (called "emitters") emit named events that cause Function objects ("listeners") to be called.

For instance: a net.Server object emits an event each time a peer connects to it; a fs.ReadStream emits an event when the file is opened; a stream emits an event whenever data is available to be read.

All objects that emit events are instances of the EventEmitter class. These objects expose an eventEmitter.on() function that allows one or more functions to be attached to named events emitted by the object. Typically, event names are camel-cased strings but any valid JavaScript property key can be used.

When the EventEmitter object emits an event, all of the functions attached to that specific event are called synchronously. Any values returned by the called listeners are ignored and will be discarded.

The following example shows a simple EventEmitter instance with a single listener. The eventEmitter.on() method is used to register listeners, while the eventEmitter.emit() method is used to trigger the event.

*/

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter1 = new MyEmitter();
myEmitter1.on('event', () =>{
  console.log('an event occured!');
});

myEmitter1.emit('event');

/*
The eventEmitter.emit() method allows an arbitrary set of arguments to be passed
to the listener functions. It is important to keep in mind that when an ordinary
listener function is called, the standard this keyword is intentionally set to
reference the EventEmitter instance to which the listener is attached.
*/

//Passing arguments and 'this' to eventListeners

const myEmitter2 = new MyEmitter();
myEmitter2.on('event', function(a, b){
  console.log(a, b, this, this === myEmitter2);
  //Prints:
  // a b MyEmitter {
  //   _events: { event: [Function] },
  //   _eventsCount: 1,
  //   _maxListeners: undefined } true

});

myEmitter2.emit('event', 'a', 'b');

/*
It is possible to use ES6 Arrow Functions as listeners,
however, when doing so, the this keyword will no longer reference
the EventEmitter instance:
*/

const myEmitter3 = new MyEmitter();
myEmitter3.on('event',(a, b)=>{
  console.log(a, b, this, this === myEmitter3);
  //Prints
  //a b {} false
});

myEmitter3.emit('event','a', 'b');

/*
The EventEmitter calls all listeners synchronously in the order in which they
were registered. This is important to ensure the proper sequencing of events and
to avoid race conditions or logic errors. When appropriate,
listener functions can switch to an asynchronous mode of operation using the
setImmediate() or process.nextTick() methods:
*/

// Asynchronous vs Synchronous

const myEmitter4 = new MyEmitter();
myEmitter4.on('event',(a, b)=>{
  setImmediate(()=>{
    console.log(a, b, "this happens asynchronously");
  });
  process.nextTick(()=>{
    console.log(a, b, "Process tick happens asynchronously");
  });
});

myEmitter4.emit('event','a','b');

/*
When a listener is registered using the eventEmitter.on() method, that listener
will be invoked every time the named event is emitted.
*/

//Handling events only once
const myEmitter5 = new MyEmitter();
let m = 0;
myEmitter5.on('event',()=>{
  console.log(++m);
});
myEmitter5.emit('event');
//Prints: 1
myEmitter5.emit('event');
//Print: 2

/*
Using the eventEmitter.once() method, it is possible to register a listener
that is called at most once for a particular event. Once the event is emitted,
the listener is unregistered and then called.
*/

const myEmitter6 = new MyEmitter();
let n = 0;
myEmitter6.once('event',()=>{
  console.log(++n);
});
myEmitter6.emit('event');
// Print: 1
myEmitter6.emit('event');
// Ignored


/*
When an error occurs within an EventEmitter instance, the typical action is for
an 'error' event to be emitted. These are treated as special cases within
Node.js.

If an EventEmitter does not have at least one listener registered for the
'error' event, and an 'error' event is emitted, the error is thrown,
a stack trace is printed, and the Node.js process exits.

*/

//Error events
const myEmitter7 = new MyEmitter
myEmitter7.on('error',(err)=>{
  console.error("whoops! there was an error");
});
myEmitter7.emit('error', new Error('whoops!'));
//Prints:
// events.js:167
//       throw er; // Unhandled 'error' event
//       ^
//
// Error: whoops!
//     at Object.<anonymous> (/Users/adarshmaurya/NodeApp/nodeEventProgram.js:132:26)
//     at Module._compile (internal/modules/cjs/loader.js:688:30)
//     at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)
//     at Module.load (internal/modules/cjs/loader.js:598:32)
//     at tryModuleLoad (internal/modules/cjs/loader.js:537:12)
//     at Function.Module._load (internal/modules/cjs/loader.js:529:3)
//     at Function.Module.runMain (internal/modules/cjs/loader.js:741:12)
//     at startup (internal/bootstrap/node.js:285:19)
//     at bootstrapNodeJSCore (internal/bootstrap/node.js:739:3)
// Emitted 'error' event at:
//     at Object.<anonymous> (/Users/adarshmaurya/NodeApp/nodeEventProgram.js:132:12)
//     at Module._compile (internal/modules/cjs/loader.js:688:30)
//     [... lines matching original stack trace ...]
//     at bootstrapNodeJSCore (internal/bootstrap/node.js:739:3)

const myEmitter8 = new MyEmitter();
// Only do this once so we don't loop forever
myEmitter8.once('newListener',(event, listener)=>{
    if(event === 'event'){
      //Insert a new listener in front
      myEmitter8.on('event',()=>{
        console.log('B');
      });
    }
});
myEmitter8.on('event',()=>{
  console.log('A');
});

myEmitter8.emit('event');
//  Prints:
//B
//A

//EventEmitter.defaultMaxListeners
//EventEmitter.setMaxListeners(n) has precedence over EventEmitter.defaultMaxListeners
//EventEmitter.getMaxListeners()

console.log("Get Default Listener count: "+ myEmitter8.getMaxListeners());
console.log("Setting listener count + 1...");
myEmitter8.setMaxListeners(myEmitter8.getMaxListeners()+1);
console.log("Updated listener count to: "+ myEmitter8.getMaxListeners());
myEmitter8.once('event',()=>{
  //do stuff
  myEmitter8.setMaxListeners(Math.max(myEmitter8.getMaxListeners()-1),0);
});
myEmitter8.emit('event');

//EventEmitter.eventNames
console.log(myEmitter8.eventNames());

//EventEmitter.listeners(eventName)
console.log(myEmitter8.listeners('event'));

//EventEmitter.off(eventName, listener) : alias EventEmitter.removeListener()

//EventEmitter.on(eventName, listener)

//EventEmitter.once(eventName, listener)

//EventEmitter.prependOnceListener(eventName, listener)

//EventEmitter.prependListener(eventName, listener)

//EventEmitter.removeAllListener([eventName])

//EventEmitter.removeListener(eventName, listener)

//Emitter.rawListeners(eventName)

const myEmitter9  = new MyEmitter();
myEmitter9.once('log',()=>console.log('log once'));
console.log(myEmitter9.rawListeners('log'));
// Prints:
// [ { [Function: bound onceWrapper] listener: [Function] } ]
const listeners = myEmitter9.rawListeners('log');
const logFnWrapper = listeners[0];
//logs "log once" to console and does not unbind the 'once' event
logFnWrapper.listener();
//logs "log once" to the console and removes the listener
logFnWrapper();

myEmitter9.on('log',()=>console.log('log persistently'));
//will return a new Array with a single funtion bound bby '.on()' above
const newListeners = myEmitter9.rawListeners('log');

//logs "log peristently twice"
newListeners[0]();

myEmitter9.emit('log');
