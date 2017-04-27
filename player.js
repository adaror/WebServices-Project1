var eventConfig = require("./config").events;
var Emmiter = require('events');
var myEmtr = new Emmiter(); // global event emitter
var mes = ''; //global variable that collect the logs
//-------Class Player------//
class Player{
    constructor(name) {
        this.name = name;  //name of the basketball player
        this.medals = 0;   //numbers of medlas
        this.baskets = 0;  //numbers of baskets
        mes += `<h1>player name ${this.name} has been created</h1>`; //add the name of the player to the global string
        exports.messages = mes; // exports the current message to index.js
    };

    //function to add medals
    addMedals(medals) {
        this.medals += medals;
        myEmtr.emit(eventConfig.medalChange,this.name,this.medals,medals);
    };

    //function to add baskets
    addBaskets(bask){
        this.baskets += bask;
        myEmtr.emit(eventConfig.basketsChange,this.name,this.baskets,bask);
    };

    //function to remove medals
    removeMedals(medals){
        if ((this.medals - medals)<0){
            myEmtr.emit(eventConfig.lowMedals,this.name,this.medals); //throw events if numbers of medals is negative
        }else{
            this.medals = this.medals - medals;                       // throw event to remove numbers of medals
            myEmtr.emit(eventConfig.medalsRemove,medals,this.name,this.medals);
        }
    };

    //function to remove baskets
    removeBaskets(baskets){
        if ((this.baskets - baskets)<0){
            myEmtr.emit(eventConfig.lowBaskets,this.name,this.baskets);
        }else{
            this.baskets = this.baskets - baskets;
            myEmtr.emit(eventConfig.basketsRemove,baskets,this.name,this.baskets);
        }
    };

};

exports.instance = Player; //exports the Player class to index.js

myEmtr.on(eventConfig.medalChange,function(name,medals,adMed){      //fire event after adding medals
    console.log(`${name} have ${medals} medals`);
    mes += `<p>You added to ${name} ${adMed} medals, now there are ${medals} medals</p>`; //collect the log to the global string
    exports.messages = mes;     //exports the current string
});

myEmtr.on(eventConfig.basketsChange,function(name,baskets,adBask){  //fire event after adding basket
    console.log(`${name} scored ${baskets} basktets`);
    mes += `<p>${name} just score ${adBask} more baskets! now there are ${baskets} baskets</p>`;
    exports.messages = mes;
});

myEmtr.on(eventConfig.lowMedals,function(name,medals){             //fire event if medals is negative
    console.log(`Medals cannot be a negative number!`);
    mes += `<p>${name}'s medals cannot be a negative number! so it is still ${medals}</p>`;
    exports.messages = mes;
});

myEmtr.on(eventConfig.medalsRemove,function(remMedals,name,medals){ //fire event after medals remove
    console.log(`${remMedals} medals were removed from ${name}`);
   mes +=`<p>${remMedals} medals were removed from ${name}, now there are ${medals} medals</p>`;
    exports.messages = mes; // export the new message
});

myEmtr.on(eventConfig.lowBaskets,function(name,baskets){            //fire event if baskets are negative
    console.log(`Baskets cannot be a negative number!`);
    mes += `<p>${name}'s baskets cannot be a negative number! so it is still ${baskets}</p>`;
    exports.messages = mes;
});

myEmtr.on(eventConfig.basketsRemove,function(remBaskets,name,baskets){  //fire event after baskets remove
    console.log(`${remBaskets} baskets were removed from ${name}`);
    mes +=`<p>${remBaskets} baskets were removed from ${name}, now there are ${baskets} baskets</p>`;
    exports.messages = mes; // export the current message
});