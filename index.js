/**
 * Created by adaror on 22/04/2017.
 */
var player = require("./player");
var eventConfig = require("./config").events;

var player1 = new player('Arik');
var player2 = new player('Or');
player1.addMedals(5);
player1.addBaskets(50);
player2.addBaskets(15);
player2.addBaskets(20);

