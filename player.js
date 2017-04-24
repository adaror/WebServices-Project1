var eventConfig = require("./config").events;
var Emmiter = require('events');
var myEmtr = new Emmiter();
var mes = '';

class Player{
    constructor(name) {
        this.name = name;
        this.medals = 0;
        this.baskets = 0;
        mes += `<h1>player name ${this.name} has been created</h1>`;
        exports.messages = mes;
    };

    addMedals(medals) {
        this.medals += medals;
        myEmtr.emit(eventConfig.medalChange,this.name,this.medals,medals);
    };

    addBaskets(bask){
        this.baskets += bask;
        myEmtr.emit(eventConfig.basketsChange,this.name,this.baskets,bask);
    };

    removeMedals(medals){
        if ((this.medals - medals)<0){
            myEmtr.emit(eventConfig.lowMedals,this.name,this.medals);
        }else{
            this.medals = this.medals - medals;
            myEmtr.emit(eventConfig.medalsRemove,medals,this.name,this.medals);
        }
    };

    removeBaskets(baskets){
        if ((this.baskets - baskets)<0){
            myEmtr.emit(eventConfig.lowBaskets,this.name,this.baskets);
        }else{
            this.baskets = this.baskets - baskets;
            myEmtr.emit(eventConfig.basketsRemove,baskets,this.name,this.baskets);
        }
    };

};

exports.instance = Player;

myEmtr.on(eventConfig.medalChange,function(name,medals,adMed){
    console.log(`${name} have ${medals} medals`);
    mes += `<p>You added to ${name} ${adMed} medals, now there are ${medals} medals</p>`;
    exports.messages = mes;
});

myEmtr.on(eventConfig.basketsChange,function(name,baskets,adBask){
    console.log(`${name} scored ${baskets} basktets`);
    mes += `<p>${name} just score ${adBask} more baskets! now there are ${baskets} baskets</p>`;
    exports.messages = mes;
});

myEmtr.on(eventConfig.lowMedals,function(name,medals){
    console.log(`Medals cannot be a negative number!`);
    mes += `<p>${name}'s medals cannot be a negative number! so it is still ${medals}</p>`;
    exports.messages = mes;
});

myEmtr.on(eventConfig.medalsRemove,function(remMedals,name,medals){
    console.log(`${remMedals} medals were removed from ${name}`);
   mes +=`<p>${remMedals} medals were removed from ${name}, now there are ${medals} medals</p>`;
    exports.messages = mes; // export the new message
});

myEmtr.on(eventConfig.lowBaskets,function(name,baskets){
    console.log(`Baskets cannot be a negative number!`);
    mes += `<p>${name}'s baskets cannot be a negative number! so it is still ${baskets}</p>`;
    exports.messages = mes;
});

myEmtr.on(eventConfig.basketsRemove,function(remBaskets,name,baskets){
    console.log(`${remBaskets} baskets were removed from ${name}`);
    mes +=`<p>${remBaskets} baskets were removed from ${name}, now there are ${baskets} baskets</p>`;
    exports.messages = mes; // export the new message
});