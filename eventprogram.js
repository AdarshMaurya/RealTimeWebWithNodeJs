//https://nodejs.org/api/events.html#events_eventemitter_listenercount_emitter_eventname
//Node uses event driven programming. Below is an example of same.

/*

EventEmitters -> Events -> Event loop -> EventHandlers

*/

//Import events module
var events = require("events");

// Create an eventEmitters object
var eventEmitter = new events.EventEmitter();

//create an event handlers as follows
var connectHandler = function connected(){
    console.log("");
    console.log("listener1 executed: connection successful");
    console.log("fires data_recieved event");
    //handle the event
    eventEmitter.emit('data_recieved');
}

//Bind the data_recieved events
eventEmitter.on('data_recieved', function data_rec(){
  console.log("listening 'data_recieved' event- data recieved successfully");
});

// Bind the data_recieved event with anonymous function
eventEmitter.on('data_recieved', function(){
    console.log("listening 'data_recieved' event- anonymous function- data recieved successfully");
    console.log("-------------------");
});


//Bind the connection event with the handlers
console.log("");
console.log("binding 'connection' event with listener1: connectHandler");
eventEmitter.on('connection', connectHandler);

//Fire the connection events
console.log("firing 'connection' event");
eventEmitter.emit('connection');
console.log("");

//Create a listener i.e listener2
var listener2 = function lisetner2(){
  console.log("listener2 executed");
}

//Adding listeners to the event
eventEmitter.addListener('listener2', listener2);

//Check the listener counts
var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " Listener(s) listening to connection event");
eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'listener2');
console.log(eventListeners + " Listener(s) listening to listener2 event");
console.log("");

//Fire the connection event again
console.log("Fire connection event:");
eventEmitter.emit('connection');
console.log("Fire listener2 event: No event handler added to it.");
eventEmitter.emit('listener2');
console.log("-------------------");
console.log("");

//Remove the binding of the listner2
eventEmitter.removeListener('connection', connectHandler);
console.log("Removing connectionHandler for event 'connection' - it will now not listen for the event.");
eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " Listener(s) listening to connection event");
console.log("");

//one time listen and then removed
console.log("adding one time listener which gets removed after its execution");
eventEmitter.once('connection',connectHandler);

console.log("Getting count of listener again.");
eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " Listener(s) listening to connection event after creation on one time event listener");
console.log("<------------------->");

console.log("firing 'connection' event");
eventEmitter.emit('connection');

console.log("one time listener - connection gets removed now");
eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " Listener(s) listening to connection event");
console.log("");
eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'listener2');
console.log(eventListeners + " Listener(s) listening to listener2 event");
console.log("<------------------->");

console.log("Program Ended.");
console.log("");
