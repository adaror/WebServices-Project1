var util = require('util');
var eventConfig = require("./config").events;
var Emmiter = require('events');
var myEmtr = new Emmiter();


class Player{

    constructor(name) {
        this.name = name;
        this.medals = 0;
        this.baskets = 0;
    }

    addMedals(medals) {
        this.medals += medals;
        this.emit(eventConfig.medalChange);
    }

    addBaskets(bask){
        this.baskets += bask;
        this.emit(eventConfig.basketsChange);
    }


}
util.inherits(Player,Emmiter.EventEmitter);


module.exports = Player;

