const add = require("./add")
const skip = require("./skip")
const enter = require("./enter")
const move = require("./move")
const current = require("./current")
const ping = require("./ping")
const quit = require("./quit")
/*
TODO: 
    %search
    %skip all
    %vote skip
    %seek
*/

function commands(command, args, tags, cli) {
    switch (command) {
        case "add":
            add(args, tags, cli)
            break
        case "skip":
            skip(args, tags, cli)
            break
        case "enter":
            enter(args, tags, cli)
            break
        case "move":
            move(args, tags, cli)
            break
        case "current":
            current(args, tags, cli)
            break
        case "ping":
            ping(args, tags, cli)
            break
        case "quit":
            quit(args, tags, cli)
            break
    }
}

module.exports = commands
