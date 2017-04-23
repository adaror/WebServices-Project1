var util = require('util');
var eventConfig = require("./config").events;
var Emmiter = require('events');
var myEmtr = new Emmiter();

class Player{
    constructor(name) {
        this.name = name;
        this.medals = 0;
        this.baskets = 0;
    };

    addMedals(medals) {
        this.medals += medals;
        myEmtr.emit(eventConfig.medalChange,this.name,this.medals);
    };

    addBaskets(bask){
        this.baskets += bask;
        myEmtr.emit(eventConfig.basketsChange,this.name,this.baskets);
    };



};

util.inherits(Player,Emmiter.EventEmitter);

myEmtr.on(eventConfig.medalChange,function(name,medals){
    console.log(`${name} have ${medals} medals!!`);
});

myEmtr.on(eventConfig.basketsChange,function(name,baskets){
    console.log(`${name} scored ${baskets} basktets!`);
})

module.exports = Player;

