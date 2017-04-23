/**
 * Created by adaror on 22/04/2017.
 */
var player = require("./player");
var eventConfig = require("./config").events;

var player1 = new player('Or')
console.log(player1);
player1.addMedals(5);
player1.on(eventConfig.medalChange,function(){
    console.log(`hey!`);
});