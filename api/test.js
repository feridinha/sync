var events = require("events")
var eventEmitter = new events.EventEmitter()

//Create an event handler:
var myEventHandler = function (from) {
    console.log("I hear a scream from ", from)
}

//Assign the eventhandler to an event:
eventEmitter.on("scream", myEventHandler)

//Fire the 'scream' event:
eventEmitter.emit("scream", "linus")