var eventConfig = require("./config").events;
var Emmiter = require('events');
var myEmtr = new Emmiter();
var mes = '';

class Player{
    constructor(name) {
        this.name = name;
        this.medals = 0;
        this.baskets = 0;
        mes += `player name ${this.name} has been created
`;
        exports.messages = mes;
    };

    addMedals(medals) {
        this.medals += medals;
        myEmtr.emit(eventConfig.medalChange,this.name,this.medals);
    };

    addBaskets(bask){
        this.baskets += bask;
        myEmtr.emit(eventConfig.basketsChange,this.name,this.baskets);
    };

    removeMedals(medals){
        if ((this.medals - medals)<0){
            myEmtr.emit(eventConfig.lowMedals,this.name,this.medals);
        }else{
            this.medals = this.medals - medals;
            myEmtr.emit(eventConfig.medalsRemove,medals,this.name,this.medals);
        }
    };

};

exports.instance = Player;

myEmtr.on(eventConfig.medalChange,function(name,medals){
    console.log(`${name} have ${medals} medals`);
    mes += `${name} now have ${medals} medals
`;
    exports.messages = mes;
});

myEmtr.on(eventConfig.basketsChange,function(name,baskets){
    console.log(`${name} scored ${baskets} basktets`);
    mes += `${name} score ${baskets} baskets
`;
    exports.messages = mes;
});

myEmtr.on(eventConfig.lowMedals,function(name,medals){
    console.log(`Medals cannot be a negative number!`);
    mes += `${name}'s medals cannot be a negative number! so it is still ${medals}
`;
    exports.messages = mes;
});

myEmtr.on(eventConfig.medalsRemove,function(remMedals,name,medals){
    console.log(`${remMedals} medals has been removed from ${name}`);
   mes += `${remMedals} medals has been remove from ${name},now there are ${medals} medals
`;
    exports.messages = mes;
});